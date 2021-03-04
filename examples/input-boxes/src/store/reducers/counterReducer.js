import { DECREASE_COUNTER, INCREASE_COUNTER, UPDATED_COUNTER } from "../../actionTypes";

const initialState = 0;
export default function counterReducer(state=initialState, action){
    switch(action && action.type){
        case INCREASE_COUNTER:
            return state + 1;
        case DECREASE_COUNTER:
            return state - 1;
        default: return state;
    }
}