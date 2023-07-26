import { streamMock } from "./helpers/streamMock";
import type * as Handler from "./handler";
const { handler } = jest.requireActual<typeof Handler>("./handler");
jest.setTimeout(1000000);

describe("component tests for streamProcessor lambda function", () => {
  it("", async () => {
    await handler(streamMock);
  });
});

export {};
