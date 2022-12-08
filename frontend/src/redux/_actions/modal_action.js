import {MODAL_OPEN} from "./types";

export const openModal = (onOff) => {
    return{
        type : MODAL_OPEN,
        payload : !onOff,
    }
}
