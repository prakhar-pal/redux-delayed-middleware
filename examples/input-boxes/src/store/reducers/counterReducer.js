const initialState = 0;
export default function counterReducer(state=initialState, action){
    switch(action && action.type){
        case 'INCREASE_DELAYED':
            return action.payload;
        default: return state;
    }
}