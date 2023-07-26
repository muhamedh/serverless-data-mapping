import { SQSEvent } from "aws-lambda";
import { sqsAdapter } from "./driving/sqsAdapter";

const handler = async (event: SQSEvent) => {
    try{
        throw Error;
        await sqsAdapter(event);
    }catch(e){
        const response = {
            batchItemFailures: [
                {
                    itemIdentifier: event.Records[0].messageId
                }
            ]
        }
        console.log(e);
        return response;
    }
    return null;
}

export { handler };    
