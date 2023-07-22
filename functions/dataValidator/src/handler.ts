import { SQSEvent } from "aws-lambda";

const handler = async (event: SQSEvent) => {
    console.log(event.Records[0]?.body);
    return true;
}

export { handler };    
