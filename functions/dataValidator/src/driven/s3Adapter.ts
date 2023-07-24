import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const readObject = async (bucketName: string, key: string) => {
  console.log("bucketName: " + bucketName + " key: " + key);
  const s3Client = new S3Client({});
  const input = {
    Bucket: bucketName,
    Key: key,
  };
  const command = new GetObjectCommand(input);
  const response = await s3Client.send(command);
  if (response.Body) {
    return response.Body.transformToString();
  }
  throw Error;
};

const copyFileToArchiveBucket = async (fileName: string) => {
  return null;
}

export { copyFileToArchiveBucket, readObject };
