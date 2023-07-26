import { SQSEvent } from "aws-lambda";
import { sqsAdapter } from "./driving/sqsAdapter";

const handler = async (event: SQSEvent) => {
    try{
        throw Error;
        await sqsAdapter(event);
    }catch(e){
        throw Error;
    }
    
}

export { handler };    
