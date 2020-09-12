import { UPDATED_COUNTER } from "../../actionTypes";

const initialState = 0;
export default function counterReducer(state=initialState, action){
    switch(action && action.type){
        case UPDATED_COUNTER:
            return action.payload;
        default: return state;
    }
}