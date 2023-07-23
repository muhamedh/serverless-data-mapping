export type S3Record = {
    eventName: string;
    eventTime: string;
    s3: S3ObjectDetails;
}

export type S3ObjectDetails = {
    bucket: {
        name: string;
    }
    object: {
        key: string;
        size: number;
    }
}