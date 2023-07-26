import { sendEvent } from "../driven/eventBridgeAdapter";

const processStream = async (stream: any) => {
  console.log(stream?.dynamodb?.Keys);
  if (stream?.eventName === "INSERT") {
    // send statefull message
    try {
      sendEvent(
        "stream-processor",
        "dataInsert",
        JSON.stringify(stream?.dynamodb?.NewImage)
      );
      return null;
    } catch (e) {
      console.log(e);
      throw Error;
    }
  }

  if (stream?.eventName === "MODIFY") {
    // send stateless message
    try {
      sendEvent(
        "stream-processor",
        "dataModify",
        JSON.stringify(stream?.dynamodb?.Keys)
      );
      return null;
    } catch (e) {
      console.log(e);
      throw Error;
    }
  }

  if (stream?.eventName === "REMOVE") {
    // send stateless message
    try {
      sendEvent(
        "stream-processor",
        "dataRemove",
        JSON.stringify(stream?.dynamodb?.Keys)
      );
      return null;
    } catch (e) {
      console.log(e);
      throw Error;
    }
  }
  return null;
};

export { processStream };
