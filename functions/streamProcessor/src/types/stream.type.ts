export type Stream = {
    Records: StreamRecords[];
}

export type StreamRecords = {
    eventID: string;
    eventName: string;
    dynamodb: object;
}