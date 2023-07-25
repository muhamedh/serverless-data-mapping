import { S3NotificationEvent, SQSEvent, SQSRecord } from "aws-lambda";
import { mapDocument } from "../domain/mapDocument";
import { S3Record } from "../types/s3.type";
const sqsAdapter = async (event: SQSEvent) => {
  //TODO write a test to check if validateDocument function gets called x times if x sqs are in event.Records[x]
  //console.log(event);
  //console.log(event);
  for (const sqsMessage of event.Records) {
    const fileName = JSON.parse(sqsMessage.body)?.fileName;
    await mapDocument(fileName);
    //console.log(JSON.stringify(sqsMessage));
  }
};

export { sqsAdapter };
