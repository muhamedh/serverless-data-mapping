import { Stream, StreamRecords } from "../types/stream.type";
import { processStream } from "../domain/processStream";
import { responseFailures } from "../types/response.type";

const dynamoDBStreamAdapter = async (streamEvents: Stream) => {
  const response: responseFailures = { batchItemFailures: [] };
  streamEvents.Records.forEach(async (event: StreamRecords) => {
    try {
      throw Error;
      await processStream(event);
    } catch (e) {
      console.log(e);
      response.batchItemFailures.push({
        itemIdentifier: event.eventID,
      });
    }
  });
  return response;
};

export { dynamoDBStreamAdapter };
