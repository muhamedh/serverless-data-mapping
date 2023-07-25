import { SQSEvent } from "aws-lambda";
import { sqsAdapter } from "./driving/sqsAdapter";

const handler = async (event: SQSEvent) => {
    try{
        await sqsAdapter(event);
    }catch(e){
        return null;
    }
    
}

export { handler };    
