type S3Payload = Record<number, S3Notification>

type S3Notification = {
    bucket: {
        name: string;
    }
    object: S3NotificationBody;
}

type S3NotificationBody = {
    key: string;
    size: string;
}