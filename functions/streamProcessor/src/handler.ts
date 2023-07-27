import { dynamoDBStreamAdapter } from "./driving/dynamoDBStreamAdapter";
import { Stream } from "./types/stream.type";

const handler = async (streamEvents: Stream) => {
    try{
        throw Error;
        await dynamoDBStreamAdapter(streamEvents);
    }catch(e){
        console.log(e);
        const response = {
            batchItemFailures: [
                {
                    itemIdentifier: streamEvents.Records[0].eventID
                }
            ]
        }
        console.log(e);
        return response;
    }
    
}

export { handler };    
