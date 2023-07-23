import { S3NotificationEvent, SQSEvent, SQSRecord } from "aws-lambda";
import { validateDocument } from "../domain/validateDocument";
import { S3Record } from "../types/s3.type";
const sqsAdapter = async (event: SQSRecord) => {
    //TODO write a test to check if validateDocument function gets called x times if x sqs are in event.Records[x]
    const s3Records: S3Record[] = JSON.parse(event?.body).Records as S3Record[];
    await validateDocument(s3Records);
}

export { sqsAdapter };    