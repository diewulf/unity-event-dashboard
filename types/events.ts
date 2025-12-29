export interface Action {
    type: string;
    value?: number;
    message?: string;
    locationID?: string;
    entityTargetID?: string;
}

export interface Sequence {
    eventID: string;
    actions: Action[];
}

export interface EventData {
    sequences: Sequence[];
}