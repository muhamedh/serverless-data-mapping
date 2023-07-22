import { SQSEvent, SQSRecord } from "aws-lambda";
import { validateDocument } from "../domain/validateDocument";
const sqsAdapter = async (event: SQSEvent) => {
    //TODO write a test to check if validateDocument function gets called x times if x sqs are in event.Records[x]
    
    for(const record of event.Records as SQSRecord[]){
        console.log(record?.body);
    }
    return true;
}

export { sqsAdapter };    