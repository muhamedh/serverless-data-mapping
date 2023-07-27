export type responseFailures = {
    batchItemFailures: batchItemFailure[];
}

export type batchItemFailure = {
    itemIdentifier: string;
}