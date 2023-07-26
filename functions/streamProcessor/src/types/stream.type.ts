export type Stream = {
    Records: StreamRecords[];
}

export type StreamRecords = {
    eventName: string;
    dynamodb: object;
}