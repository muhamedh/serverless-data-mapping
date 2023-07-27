import libxml from "libxmljs";
import fs from "fs";
import path from "path";
import { readObject, copyFileToArchiveBucket, deleteFileFromArrivalBucket, moveToErrorBucket } from "../driven/s3Adapter";
import { sendMessage } from "../driven/sqsAdapter";
import { sendStatelessEvent } from "../driven/eventBridgeAdapter";
import { S3Record } from "../types/s3.type";
let XSD_SCHEMA: any = null;
const EVENT_SOURCE = "data-validator";
const EVENT_DETAIL_TYPE = "Invalid XML format.";

const getXSDSchema = () => {
  if (XSD_SCHEMA != null) {
    console.log("reused XSD schema");
    return libxml.parseXml(XSD_SCHEMA);
  }
  try {
    const filePath = path.resolve(__dirname, "../schemas/xml_schema.xsd");
    XSD_SCHEMA = fs.readFileSync(filePath, "utf8");
    return libxml.parseXml(XSD_SCHEMA);
  } catch (err) {
    //TODO throw in a way to go to DLQ
    console.error(err);
    throw Error;
  }
};

const performValidation = async (documentContents: string) => {
  let parsed_document = null;
  let parsing_result = null;
  try {
    parsed_document = libxml.parseXml(documentContents);
  } catch (e) {
    console.log(e);
    await sendStatelessEvent(EVENT_SOURCE, EVENT_DETAIL_TYPE, {
      timeOfEvent: new Date().toISOString(),
    });
    return false;
  }

  const parsed_xsd_schema = getXSDSchema();

  try {
    parsing_result = parsed_document.validate(parsed_xsd_schema);
  } catch (e) {
    console.log(e);
    //TODO throw in a way for dlq
    throw Error;
  }

  if (!parsing_result) {
    await sendStatelessEvent(EVENT_SOURCE, EVENT_DETAIL_TYPE, {
      timeOfEvent: new Date().toISOString(),
    });
    return false;
  }
  //TODO perform pricing validation

  //TODO perform inventory validation
  return true;
};

const validateDocument = async (s3Record: S3Record) => {
  // read document from s3
  const objectKey = s3Record.s3.object.key;
  const documentContents = await readObject(
    s3Record.s3.bucket.name,
    s3Record.s3.object.key
  );

  if(!await performValidation(documentContents)){
    await moveToErrorBucket(objectKey);
    await deleteFileFromArrivalBucket(objectKey);
    throw Error;
  }

  
  //copy file to archive bucket used for data reseeding
  await copyFileToArchiveBucket(objectKey);
  //send message to data mapping sqs
  await sendMessage({ fileName: objectKey });
  await deleteFileFromArrivalBucket(objectKey);
  return null;
};

export { validateDocument };
