import { S3Client, S3ClientConfig, GetObjectCommand } from "@aws-sdk/client-s3";

const readObject = async(bucketName: string, key: string) => {
    const s3Client = new S3Client({});
    const input = {
        Bucket: bucketName,
        Key: key
    }
    const command = new GetObjectCommand(input);
    const response = await s3Client.send(command);
}

const s3Adapter = async (record:any) => { 
    // read document from s3
    
 };

export { s3Adapter, readObject };
