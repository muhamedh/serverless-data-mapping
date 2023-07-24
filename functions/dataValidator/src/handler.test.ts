import { sqsArrivalMessage } from "./helpers/sqsArrivalMessageMock";
import { mockClient } from "aws-sdk-client-mock";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs';
import path from 'path';

import type * as Handler from "./handler"
import { sdkStreamMixin } from "@aws-sdk/util-stream-node";
const { handler } = jest.requireActual<typeof Handler>("./handler")
jest.setTimeout(1000000);

describe("component tests for dataValidator lambda function", () => {
  
  const s3Mock = mockClient(S3Client);

  beforeEach(()=>{
    s3Mock.reset();
  })
  it("should validate s3 object xml file against xsd schema", async () => {
    const filePath = path.resolve(__dirname, './helpers/productXMLMock.xml');
    const stream = sdkStreamMixin(fs.createReadStream(filePath));
    s3Mock.on(GetObjectCommand).resolves({
      Body: stream,
    });
    const response = await handler(sqsArrivalMessage);
    expect(s3Mock.call(0).args[0].input).toEqual({
      Bucket: "arrival-bucket-426643868142",
      Key: "test/TODO.txt"
    })
    });
})

export {}