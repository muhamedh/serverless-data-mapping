import { SQSClient , SendMessageCommand } from "@aws-sdk/client-sqs";

const sendMessage = async (message: any) => {
  console.log("send message");
  const sqsClient = new SQSClient({});

  const input = {
    QueueUrl: process.env.entry_data_mapping_sqs,
    MessageBody: JSON.stringify(message)
  };
  console.log(JSON.stringify(input));
  const command = new SendMessageCommand(input);
  
  try{
    return await sqsClient.send(command);
  }catch(e){
    throw Error;
  }
};

const sqsAdapter = async (record: any) => {
  // read document from s3
};

export { sqsAdapter, sendMessage };
