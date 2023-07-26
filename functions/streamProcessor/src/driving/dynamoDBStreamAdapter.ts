
import { Stream, StreamRecords } from "src/types/stream.type";
import { processStream } from "../domain/processStream";

const dynamoDBStreamAdapter = async (streamEvents: Stream) => {

  streamEvents.Records.forEach(async (event: StreamRecords)=>{
    await processStream(event);
  })
  
  
};

export { dynamoDBStreamAdapter };
