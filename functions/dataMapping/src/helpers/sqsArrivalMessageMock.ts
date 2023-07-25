export const sqsArrivalMessage: any = {
  Records: [
    {
      messageId: "802723ba-3bbe-4794-b2bc-595f4969be88",
      receiptHandle: "dummyReceiptHandle",
      body: '{ "fileName": "product/123456789_1.xml" }',
      attributes: {
        ApproximateReceiveCount: "1",
        SentTimestamp: "1690057717056",
        SenderId: "AIDAJHIPRHEMV73VRJEBU",
        ApproximateFirstReceiveTimestamp: "1690057717062",
      },
      messageAttributes: {},
      md5OfBody: "58e83147210c41c52d83911b6fbd7b68",
      eventSource: "aws:sqs",
      eventSourceARN:
        "arn:aws:sqs:us-east-1:426643868142:entry-data-validator-sqs",
      awsRegion: "us-east-1",
    },
  ],
};
