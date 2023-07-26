import { dynamoDBStreamAdapter } from "./driving/dynamoDBStreamAdapter";

const handler = async (event: any) => {
    try{
        await dynamoDBStreamAdapter(event);
    }catch(e){
        return null;
    }
    
}

export { handler };    
