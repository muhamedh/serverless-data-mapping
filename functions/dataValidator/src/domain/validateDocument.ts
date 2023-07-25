import libxml from "libxmljs";
import fs from "fs";
import path from "path";
import { readObject, copyFileToArchiveBucket } from "../driven/s3Adapter";
import { sendMessage } from "../driven/sqsAdapter";
import { S3Record } from "../types/s3.type";
let XSD_SCHEMA: any = null;

const getXSDSchema = () => {
  if (XSD_SCHEMA != null) {
    console.log("reused XSD schema");
    return XSD_SCHEMA;
  }
  try {
    const filePath = path.resolve(__dirname, "../schemas/xml_schema.xsd");
    XSD_SCHEMA = fs.readFileSync(filePath, "utf8");
    return libxml.parseXml(XSD_SCHEMA);
  } catch (err) {
    //TODO throw in a way to go to DLQ
    console.error(err);
  }
  return XSD_SCHEMA;
};

const performValidation = async (documentContents: string) => {
  let parsed_document = null;
  try {
    parsed_document = libxml.parseXml(documentContents)
  } catch (e) {
    //TODO send message to eventbridge
    throw Error;
  }
  
  const parsed_xsd_schema = getXSDSchema();

  try{
    parsed_document.validate(parsed_xsd_schema);
  } catch (e) {
    //TODO send message to eventbridge
    throw Error;
  }

  //TODO perform pricing validation

  //TODO perform inventory validation
  
};

const validateDocument = async (s3Record: S3Record) => {
  // read document from s3
  const documentContents = await readObject(
    s3Record.s3.bucket.name,
    s3Record.s3.object.key
  );
  
  await performValidation(documentContents);

  //TODO send message to data mapping sqs
  const r = await sendMessage({ fileName: s3Record.s3.object.key});
  console.log(r);
  //TODO copy file to archive bucket used for data reseeding
  copyFileToArchiveBucket(s3Record.s3.object.key);
  // DEBUG -> console.log("validateDocument: " + response);
};

export { validateDocument };
