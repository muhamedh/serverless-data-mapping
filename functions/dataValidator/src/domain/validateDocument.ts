import libxml from "libxmljs";
import fs from "fs";
import path from "path";
import { readObject } from "../driven/s3Adapter";
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

const validateDocumentSyntax = async (documentContents: string) => {
  try {
    libxml.parseXml(documentContents);
  } catch (e) {
    //TODO send message to eventbridge
    return false;
  }
  return true;
};

const validateDocumentAgainstXSDSchema = async (documentContents: string) => {
  const parsed_xsd_schema = getXSDSchema();
  const parsed_document = libxml.parseXml(documentContents);
  parsed_document.validate(parsed_xsd_schema);
};

const validatePrices = async () => {
  // validate currency code
  return null;
};

const validateInventoryStatus = async () => {
  return null;
};

const validateDocument = async (s3Record: S3Record) => {
  // read document from s3
  const documentContents = await readObject(
    s3Record.s3.bucket.name,
    s3Record.s3.object.key
  );

  validateDocumentSyntax(documentContents);

  validateDocumentAgainstXSDSchema(documentContents);

  validatePrices();

  validateInventoryStatus();

  //TODO send message to data mapping sqs

  //TODO copy file to archive bucket used for data reseeding

  // DEBUG -> console.log("validateDocument: " + response);
};

export { validateDocument };
