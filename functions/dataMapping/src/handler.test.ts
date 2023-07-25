import { sqsArrivalMessage } from "./helpers/sqsArrivalMessageMock";
import { mockClient } from "aws-sdk-client-mock";
import { S3Client, GetObjectCommand, CopyObjectCommand } from "@aws-sdk/client-s3";

import fs from "fs";
import path from "path";

import type * as Handler from "./handler";
import { sdkStreamMixin } from "@aws-sdk/util-stream-node";

const { handler } = jest.requireActual<typeof Handler>("./handler");
jest.setTimeout(1000000);

describe("component tests for dataValidator lambda function", () => {
  const s3Mock = mockClient(S3Client);

  beforeEach(() => {
    s3Mock.reset();
  });

  it("should send message to entry-data-mapping sqs and copy object to archive bucket", async () => {
    const filePath = path.resolve(__dirname, "./helpers/productXMLMock.xml");
    const stream = sdkStreamMixin(fs.createReadStream(filePath));
    process.env.archive_bucket = 'dummy_archive_bucket_name';
    s3Mock.on(GetObjectCommand).resolves({
      Body: stream,
    });
    s3Mock.on(CopyObjectCommand).resolves({});

    await handler(sqsArrivalMessage);
    
    expect(s3Mock.call(0).args[0].input).toEqual({
      Bucket: "dummy_archive_bucket_name",
      Key: "product/123456789_1.xml",
    });

    //TODO add match snapshot when sending to DynamoDB
  });

  it("should map multi sku product", async () => {
    const filePath = path.resolve(__dirname, "./helpers/productXMLMockMultiSKU.xml");
    const stream = sdkStreamMixin(fs.createReadStream(filePath));
    process.env.archive_bucket = 'dummy_archive_bucket_name';
    s3Mock.on(GetObjectCommand).resolves({
      Body: stream,
    });
    s3Mock.on(CopyObjectCommand).resolves({});

    await handler(sqsArrivalMessage);
    
    expect(s3Mock.call(0).args[0].input).toEqual({
      Bucket: "dummy_archive_bucket_name",
      Key: "product/123456789_1.xml",
    });
    
    //TODO add match snapshot when sending to DynamoDB
  });
});

export {};
