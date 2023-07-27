import { SQSEvent } from "aws-lambda";
import { mapDocument } from "../domain/mapDocument";
import { responseFailures } from "../types/response.type";

const sqsAdapter = async (event: SQSEvent) => {
  const response: responseFailures = { batchItemFailures: [] };
  for (const sqsMessage of event.Records) {
    const fileName = JSON.parse(sqsMessage.body)?.fileName;
    try{
      await mapDocument(fileName);
    } catch(e){
      console.log(e);
      response.batchItemFailures.push({
        itemIdentifier: sqsMessage.messageId,
      });
    }
    return response;
  }
};

export { sqsAdapter };
