import {
  S3Client,
  GetObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({});

const readObject = async (bucketName: string, key: string) => {
  console.log("read object from -> bucketName: " + bucketName + " key: " + key);

  const input = {
    Bucket: bucketName,
    Key: key,
  };
  const command = new GetObjectCommand(input);
  const response = await s3Client.send(command);
  if (response.Body) {
    return response.Body.transformToString();
  }
  //TODO throw in a way to end up in dlq
  throw Error;
};

const copyFileToArchiveBucket = async (fileName: string) => {
  console.log("copy object -> " + fileName);
  const input = {
    Bucket: process.env.archive_bucket,
    CopySource: `/${process.env.arrival_bucket}/${fileName}`,
    Key: fileName,
  };
  const command = new CopyObjectCommand(input);
  try {
    await s3Client.send(command);
  } catch (e) {
    //TODO throw in a way to end up in dlq
    throw Error;
  }
};

const deleteFileFromArrivalBucket = async (fileName: string) => {
  console.log("delete object -> " + fileName);
  const input = {
    Bucket: process.env.arrival_bucket,
    Key: fileName,
  };
  const command = new DeleteObjectCommand(input);
  try {
    await s3Client.send(command);
  } catch (e) {
    //TODO throw in a way to end up in dlq
    throw Error;
  }
};

const moveToErrorBucket = async (fileName: string) => {
  console.log("moving to error bucket -> " + fileName);
  const input = {
    Bucket: process.env.error_bucket,
    CopySource: `/${process.env.arrival_bucket}/${fileName}`,
    Key: fileName,
  };
  const command = new CopyObjectCommand(input);
  try {
    await s3Client.send(command);
  } catch (e) {
    //TODO throw in a way to end up in dlq
    throw Error;
  }
}

export { copyFileToArchiveBucket, deleteFileFromArrivalBucket, readObject, moveToErrorBucket };
