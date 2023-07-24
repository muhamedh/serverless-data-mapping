import libxmljs from "libxmljs";
import { readFile } from "fs";
import { readObject } from "../driven/s3Adapter";
import { S3Record } from "../types/s3.type";

let XSD_SCHEMA: any = null;

const getXSDSchema = () => {
  if(XSD_SCHEMA){
    console.log('reused XSD schema');
    return XSD_SCHEMA;
  }else{
    XSD_SCHEMA = readFile('../schemas/xml_schema.xsd', 'utf-8', (err,data) => {
      if(err){
        //TODO throw in a way to go to DLQ
      }
      return libxmljs.parseXml(data);
    });
  }
  return XSD_SCHEMA;
}

const validateDocumentSyntax = async (documentContents: string) => {
  try {
    libxmljs.parseXml(documentContents);
  } catch (e) {
    //TODO send message to eventbridge
    return false;
  }
  return true;
};

const validateDocumentAgainstXSDSchema = async (documentContents: string) => {
  const parsed_xsd_schema = getXSDSchema();
  libxmljs.parseXml(documentContents).validate(parsed_xsd_schema);
}

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
