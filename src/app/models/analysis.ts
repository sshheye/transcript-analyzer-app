import { Script } from "../models/script";
import { Transcript } from "../models/transcript";
export interface Analysis {
    call_id: string;
    file_url: string;
    calltype_id: string;
    call_datetime: string;
    duration: number;
    agent: Agent[];
    customer: Customer[];
    script: Script[];
    transcript: Transcript[];
}

export interface Customer {
    full_name: string;
    channel_no: number
}

export interface Agent {
    agent_id: string;
    channel_no: number
}