import { SQSRecord } from "aws-lambda";
import { sqsAdapter } from "./driving/sqsAdapter";

const handler = async (event: SQSRecord) => {
    await sqsAdapter(event);
}

export { handler };    
