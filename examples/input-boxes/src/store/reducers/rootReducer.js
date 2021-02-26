import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import counterUpdateReducer from "./delayedReducers/counterUpdateReducer";
import reduxActionsReducer from "./reduxActionsReducer";
const rootReducer = combineReducers({
    counter: process.env.NAMED_MIDDLEWARE ? counterUpdateReducer : counterReducer,
    reduxActions: reduxActionsReducer
});

export default rootReducer;