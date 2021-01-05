import { Call } from "../models/call";

const mockCalls: Call[] = [
    {
        "call_id": "572a41e7a",
        "calltype_id": "f44785ceA",
        "agent": [
            {
                "agent_id": "A7f63308a",
                "channel_no": 1
            }
        ],
        "customer": [
            {
                "full_name": "Luke Skywalker",
                "channel_no": 2
            }
        ],
        "call_start_time": new Date("2020-07-20 01:00:45"),
        "gs_file_url": "gs://recordings/572a41e7A.wav",
        "duration": 238900
    }
]

export { mockCalls }