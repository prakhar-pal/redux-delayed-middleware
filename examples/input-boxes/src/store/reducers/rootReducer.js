import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import reduxActionsReducer from "./reduxActionsReducer";
const rootReducer = combineReducers({
    counter: counterReducer,
    reduxActions: reduxActionsReducer
});

export default rootReducer;