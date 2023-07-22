import { SQSEvent, SQSRecord } from "aws-lambda";
import { validateDocument } from "../domain/validateDocument";
const sqsAdapter = async (event: SQSEvent) => {
    //TODO write a test to check if validateDocument function gets called x times if x sqs are in event.Records[x]
    
    for(const record of event.Records as SQSRecord[]){
        console.log(record);
        const r = JSON.parse(record?.body);

        console.log(r?.s3?.object?.key);
    }
    return true;
}

export { sqsAdapter };    