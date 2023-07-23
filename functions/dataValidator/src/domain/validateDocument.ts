import { readObject, s3Adapter } from "../driven/s3Adapter";
import { S3Record } from "../types/s3.type";

const validateDocument = async (s3Record: S3Record) => {
  // read document from s3
  //s3Adapter();

  const response = await readObject(
    s3Record.s3.bucket.name,
    s3Record.s3.object.key
  );
  console.log("validateDocument" + JSON.stringify(response));
};

export { validateDocument };
