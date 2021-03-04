import { UPDATED_COUNTER } from "../../../actionTypes";

const initialState = 0;
const counterUpdateReducer = (state = initialState, action) => {
    if (action.type === UPDATED_COUNTER) {
        return action.payload || state;
    } else {
        return state;
    }
}

export default counterUpdateReducer;