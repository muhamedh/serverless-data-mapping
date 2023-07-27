import { sqsArrivalMessage } from "./helpers/sqsArrivalMessageMock";
import { mockClient } from "aws-sdk-client-mock";
import { S3Client, GetObjectCommand, CopyObjectCommand } from "@aws-sdk/client-s3";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

import fs from "fs";
import path from "path";

import type * as Handler from "./handler";
import { sdkStreamMixin } from "@aws-sdk/util-stream-node";
import {
  CloudWatchEventsClient,
  PutEventsCommand,
} from "@aws-sdk/client-cloudwatch-events";
const { handler } = jest.requireActual<typeof Handler>("./handler");
jest.setTimeout(1000000);

describe("component tests for dataValidator lambda function", () => {
  const s3Mock = mockClient(S3Client);
  const sqsMock = mockClient(SQSClient);
  const eventBridgeMock = mockClient(CloudWatchEventsClient);

  beforeEach(() => {
    s3Mock.reset();
    sqsMock.reset();
    eventBridgeMock.reset();
  });

  it("should send message to entry-data-mapping sqs, copy object to archive bucket and delete it from archive", async () => {
    const filePath = path.resolve(__dirname, "./helpers/productXMLMock.xml");
    const stream = sdkStreamMixin(fs.createReadStream(filePath));
    process.env.archive_bucket = 'dummy_archive_bucket_name';
    process.env.arrival_bucket = 'dummy_arrival_bucket_name';
    s3Mock.on(GetObjectCommand).resolves({
      Body: stream,
    });
    s3Mock.on(CopyObjectCommand).resolves({});
    sqsMock.on(SendMessageCommand).resolves({});
    await handler(sqsArrivalMessage);
    expect(s3Mock.call(0).args[0].input).toMatchSnapshot();
    expect(s3Mock.call(1).args[0].input).toMatchSnapshot();
    expect(s3Mock.call(2).args[0].input).toMatchSnapshot();
    expect(sqsMock.call(0).args[0].input).toMatchSnapshot();
  });

  it("should send message to eventbridge due to xml syntax error", async () => {
    const filePath = path.resolve(
      __dirname,
      "./helpers/productSyntaxErrorMock.xml"
    );
    const stream = sdkStreamMixin(fs.createReadStream(filePath));

    s3Mock.on(GetObjectCommand).resolves({
      Body: stream,
    });
    sqsMock.on(SendMessageCommand).resolves({});
    eventBridgeMock.on(PutEventsCommand).resolves({});

    const mockISOString = "2023-07-25T12:34:56.000Z";
    const toISOStringSpy = jest
      .spyOn(Date.prototype, "toISOString")
      .mockReturnValue(mockISOString);

    await handler(sqsArrivalMessage);
    expect(s3Mock.call(0).args[0].input).toMatchSnapshot();
    expect(eventBridgeMock.call(0).args[0].input).toEqual({
      Entries: [
        {
          Source: "data-validator",
          DetailType: "Invalid XML format.",
          Detail: JSON.stringify({ timeOfEvent: mockISOString }),
        },
      ],
    });
  });

  it("should send message to eventbridge due to xml not being inline with schema", async () => {
    const filePath = path.resolve(
      __dirname,
      "./helpers/productSchemaErrorMock.xml"
    );
    const stream = sdkStreamMixin(fs.createReadStream(filePath));

    s3Mock.on(GetObjectCommand).resolves({
      Body: stream,
    });
    sqsMock.on(SendMessageCommand).resolves({});
    eventBridgeMock.on(PutEventsCommand).resolves({});

    const mockISOString = "2023-07-25T12:34:56.000Z";
    const toISOStringSpy = jest
      .spyOn(Date.prototype, "toISOString")
      .mockReturnValue(mockISOString);

    await handler(sqsArrivalMessage);
    expect(s3Mock.call(0).args[0].input).toEqual({
      Bucket: "arrival-bucket-426643868142",
      Key: "product/123456789_1.xml",
    });
    expect(eventBridgeMock.call(0).args[0].input).toEqual({
      Entries: [
        {
          Source: "data-validator",
          DetailType: "Invalid XML format.",
          Detail: JSON.stringify({ timeOfEvent: mockISOString }),
        },
      ],
    });
  });
  
});

export {};
