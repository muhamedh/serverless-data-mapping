import { CloudWatchEventsClient, PutEventsCommand } from "@aws-sdk/client-cloudwatch-events";
import { StatelessEvent, StatelessEventDetail } from "src/types/eventbridge.type";

const client = new CloudWatchEventsClient({});

const eventBuilder = (source: string, detailType: string, detail: StatelessEventDetail): StatelessEvent => {
    return {
        Entries: [
            {
                Source: source,
                DetailType: detailType,
                Detail: JSON.stringify(detail),
                EventBusName: process.env.event_bus_name,
            },
        ],
    };
}

const sendStatelessEvent = async (source: string, detailType: string, detail: StatelessEventDetail) => {
  console.log('Sending message to EventBridge...');
  const command = await new PutEventsCommand(eventBuilder(source, detailType, detail));
  try {
    return await client.send(command);
  } catch (e){
    console.log(e);
    throw Error;
  }
};

export { sendStatelessEvent };
