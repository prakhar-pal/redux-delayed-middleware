import { INCREASE_COUNTER, DECREASE_COUNTER } from "../../../actionTypes";

const initialState = 0;
const counterReducer = (state=initialState, action) => {
    switch(action && action.type){
        case INCREASE_COUNTER:
            return state + 1;
        case DECREASE_COUNTER:
            return state - 1;
        default: return state;
    }
}

export default counterReducer;