import { S3Client, GetObjectCommand, CopyObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({});

const readObject = async (bucketName: string | undefined, key: string) => {
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
    Key: fileName
  };
  const command = new CopyObjectCommand(input);
  try{
    await s3Client.send(command);
  }catch(e){
    //TODO throw in a way to end up in dlq
    console.log(e);
    throw Error
  }
}

export { copyFileToArchiveBucket, readObject };
