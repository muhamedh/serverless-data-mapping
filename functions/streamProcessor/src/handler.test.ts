import { streamMockInsert, streamMockModify, streamMockRemove } from "./helpers/streamMock";
import { mockClient } from "aws-sdk-client-mock";

import type * as Handler from "./handler";
import {
  CloudWatchEventsClient,
  PutEventsCommand,
} from "@aws-sdk/client-cloudwatch-events";

const { handler } = jest.requireActual<typeof Handler>("./handler");
jest.setTimeout(1000000);

describe("component tests for streamProcessor lambda function", () => {
  const eventBridgeMock = mockClient(CloudWatchEventsClient);
  beforeEach(() => {
    eventBridgeMock.reset();
  });

  it("should send a statefull event to eventbridge on insert stream event", async () => {
    eventBridgeMock.on(PutEventsCommand).resolves({});
    await handler(streamMockInsert);
    expect(eventBridgeMock.call(0).args[0].input).toMatchSnapshot();
  });

  it("should send a stateless event to eventbridge on modify stream event", async () => {
    eventBridgeMock.on(PutEventsCommand).resolves({});
    await handler(streamMockModify);
    expect(eventBridgeMock.call(0).args[0].input).toMatchSnapshot();
  });

  it("should send a stateless event to eventbridge on remove stream event", async () => {
    eventBridgeMock.on(PutEventsCommand).resolves({});
    await handler(streamMockRemove);
    expect(eventBridgeMock.call(0).args[0].input).toMatchSnapshot();
  });
  
});

export {};
