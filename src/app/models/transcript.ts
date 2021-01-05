export interface Transcript {
    order: number;
    similarity: number;
    sentence: string;
    matching_sentence: string;
    channel: number;
    timeFrom: number;
    timeTo: number;
}
