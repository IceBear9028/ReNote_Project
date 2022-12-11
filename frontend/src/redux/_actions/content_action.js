import axios from "axios";
import {ALL_SCHEDULE} from "./types";

export const allSchedule = () => {
    const request = axios.get('/api/document/findDocumentAll')
        .then((res) => res.data);

    return{
        type : ALL_SCHEDULE,
        payload : request
    }
}