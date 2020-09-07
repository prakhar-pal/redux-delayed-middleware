const initialState = 0;
const increaseReducer = (state=initialState, action) => {
    switch(action && action.type){
        case 'INCREASE':
            return state + action.payload;
        default: return state;
    }
}

export default increaseReducer;