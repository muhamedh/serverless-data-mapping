export const sqsMessage: any = {
    "messageId": "802723ba-3bbe-4794-b2bc-595f4969be88",
    "receiptHandle": "dummyReceiptHandle",
    "body": "{\"Records\":[{\"eventVersion\":\"2.1\",\"eventSource\":\"aws:s3\",\"awsRegion\":\"us-east-1\",\"eventTime\":\"2023-07-22T20:28:35.846Z\",\"eventName\":\"ObjectCreated:Put\",\"userIdentity\":{\"principalId\":\"AWS:AIDAWGVPUZHXMBZLSGOOG\"},\"requestParameters\":{\"sourceIPAddress\":\"109.175.96.137\"},\"responseElements\":{\"x-amz-request-id\":\"8XFPR8NHC2138SYC\",\"x-amz-id-2\":\"qREru8zKr06UekfJc37LFXWIRXwt2IQRASBR/GeRZzNVnoOX5VytnVvyU+p+KReZRhSS9ZVynBCTbZN0FnwkTRCapxmcNdRf\"},\"s3\":{\"s3SchemaVersion\":\"1.0\",\"configurationId\":\"tf-s3-queue-20230708150311413300000004\",\"bucket\":{\"name\":\"arrival-bucket-426643868142\",\"ownerIdentity\":{\"principalId\":\"A3A7467IIJAPWQ\"},\"arn\":\"arn:aws:s3:::arrival-bucket-426643868142\"},\"object\":{\"key\":\"test/TODO.txt\",\"size\":11,\"eTag\":\"651f642eb20ced4f7f7a074d7659e41d\",\"sequencer\":\"0064BC3BF3CED1E3A7\"}}}]}",
    "attributes": {
      "ApproximateReceiveCount": "1",
      "SentTimestamp": "1690057717056",
      "SenderId": "AIDAJHIPRHEMV73VRJEBU",
      "ApproximateFirstReceiveTimestamp": "1690057717062"
    },
    "messageAttributes": {},
    "md5OfBody": "58e83147210c41c52d83911b6fbd7b68",
    "eventSource": "aws:sqs",
    "eventSourceARN": "arn:aws:sqs:us-east-1:426643868142:entry-data-validator-sqs",
    "awsRegion": "us-east-1"
  }