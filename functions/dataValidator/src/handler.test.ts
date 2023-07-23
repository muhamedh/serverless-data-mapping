import { sqsMessage } from "./driving/data/sqsNotification";

import type * as Handler from "./handler"
const { handler } = jest.requireActual<typeof Handler>("./handler")

describe("silly function", () => {
  test("guaranteed random", async () => {
    const response = await handler(sqsMessage);
    console.log(response);
  });
})

export {}