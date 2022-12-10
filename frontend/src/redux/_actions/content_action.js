import axios from "axios";
import {ALL_SCHEDULE} from "./types";

export const allSchedule = (DataSubmit) => {
    const request = axios.post('/api/document/findDocumentAll', DataSubmit)
        .then((res) => res.data);

    return{
        type : ALL_SCHEDULE,
        payload : request
    }
}