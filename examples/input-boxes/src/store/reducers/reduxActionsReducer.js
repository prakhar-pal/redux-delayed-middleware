function reduxActionsReducer(state={}, action){
    return { ...state, [action.type]: state[action.type] ? state[action.type] + 1 : 1 };
}
export default reduxActionsReducer;
