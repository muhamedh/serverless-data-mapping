export type StatelessEventDetail = {
    timeOfEvent: string;
}

export type StatelessEvent = {
    Entries: StatelessEventEntry[];
}

export type StatelessEventEntry = {
    Source: string;
    DetailType: string;
    Detail: string;
    EventBusName: string | undefined;
}