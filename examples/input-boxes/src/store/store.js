import { createStore, applyMiddleware, compose } from "redux";
import createDelayMiddleware from "../../../../src/index";
import increaseReducer from "./reducers/delayedReducers/increaseReducer";
import rootReducer from "./reducers/rootReducer";
import { UPDATED_COUNTER } from "../actionTypes";

const delayedMiddleware = createDelayMiddleware({
    reducers: [
        {
            id: UPDATED_COUNTER,
            reducer: increaseReducer
        }
    ]
});

const loggerMiddleware = () => (next) => (action) => {
    console.log("loggerMiddleware -> New Redux Action::", action);
    next(action);
};

const middleware = [loggerMiddleware, delayedMiddleware];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(...middleware)));

export default store;

