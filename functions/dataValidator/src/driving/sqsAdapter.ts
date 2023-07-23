import { S3NotificationEvent, SQSEvent, SQSRecord } from "aws-lambda";
import { validateDocument } from "../domain/validateDocument";
import { S3Record } from "../types/s3.type";
const sqsAdapter = async (event: SQSEvent) => {
  //TODO write a test to check if validateDocument function gets called x times if x sqs are in event.Records[x]
  //console.log(event);
  for (const sqsMessage of event.Records) {
    const s3Notifications: S3Record[] = JSON.parse(sqsMessage.body).Records;
    for (const s3Notification of s3Notifications) {
      //console.log(s3Notification);
      await validateDocument(s3Notification);
    }
  }
};

export { sqsAdapter };
