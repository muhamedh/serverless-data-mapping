import { dynamoDBStreamAdapter } from "./driving/dynamoDBStreamAdapter";
import { Stream } from "./types/stream.type";

const handler = async (streamEvents: Stream) => {
    try{
        return await dynamoDBStreamAdapter(streamEvents);
    }catch(e){
        console.log(e);
        return null;
    }
    
}

export { handler };    
