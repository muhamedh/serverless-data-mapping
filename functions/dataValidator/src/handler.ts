import { SQSEvent } from "aws-lambda";
import { sqsAdapter } from "./driving/sqsAdapter";

const handler = async (event: SQSEvent) => {
    await sqsAdapter(event);
}

export { handler };    
