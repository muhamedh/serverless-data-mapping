import { SQSEvent } from "aws-lambda";
import { sqsAdapter } from "./driving/sqsAdapter";

const handler = async (event: SQSEvent) => {
    try{
        await sqsAdapter(event);
    }catch(e){
        console.log(e);
        return null;
    }
    
}

export { handler };    
