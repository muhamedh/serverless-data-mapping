
import { processStream } from "../domain/processStream";

const dynamoDBStreamAdapter = async (event: any) => {

  await processStream(event);
  
};

export { dynamoDBStreamAdapter };
