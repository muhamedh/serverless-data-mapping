import { S3NotificationEvent, SQSEvent, SQSRecord } from "aws-lambda";
import { validateDocument } from "../domain/validateDocument";
const sqsAdapter = async (event: SQSEvent) => {
    //TODO write a test to check if validateDocument function gets called x times if x sqs are in event.Records[x]
    const records: SQSRecord[] = event.Records; 
    for(const record of records){
        if(!('body' in record)){
            continue;
        }
        const s3Payloads: S3Payload[] = JSON.parse(record?.body) as S3Payload[];
        console.log(JSON.stringify('sqsAdapter: ' + JSON.stringify(s3Payloads)));
        await validateDocument(s3Payloads);
        
    }
    return true;
}

export { sqsAdapter };    