import { createStore, applyMiddleware, compose } from "redux";
import delayedMiddlewareDefault , { createDelayMiddleware } from "../../../../src/index";
import counterReducer from "./reducers/delayedReducers/counterReducer";
import rootReducer from "./reducers/rootReducer";
import { UPDATED_COUNTER } from "../actionTypes";

const delayedMiddleware2 = createDelayMiddleware({
    reducers: [
        {
            id: UPDATED_COUNTER,
            reducer: counterReducer
        }
    ]
});

const loggerMiddleware = () => (next) => (action) => {
    console.log("loggerMiddleware -> New Redux Action::", action);
    next(action);
};

console.log('default middleware:', process.env.DEFAULT_MIDDLEWARE);

const finalDelayMiddleware = process.env.DEFAULT_MIDDLEWARE ? delayedMiddlewareDefault : delayedMiddleware2;
const middleware = [loggerMiddleware, finalDelayMiddleware];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(...middleware)));

export default store;

