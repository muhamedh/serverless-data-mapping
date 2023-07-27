import { SQSEvent } from "aws-lambda";
import { validateDocument } from "../domain/validateDocument";
import { S3Record } from "../types/s3.type";
import { responseFailures } from "../types/response.type";
const sqsAdapter = async (event: SQSEvent) => {
  const response: responseFailures = { batchItemFailures: [] };
  for (const sqsMessage of event.Records) {
    const s3Notifications: S3Record[] = JSON.parse(sqsMessage.body).Records;
    try {
      for (const s3Notification of s3Notifications) {
        await validateDocument(s3Notification);
      }
    } catch (e) {
      console.log(e);
      response.batchItemFailures.push({
        itemIdentifier: sqsMessage.messageId,
      });
    }
  }
  return response;
};

export { sqsAdapter };
