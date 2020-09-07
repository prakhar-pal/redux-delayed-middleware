import { createStore, applyMiddleware } from "redux";
import createDelayMiddleware from "../../../../src/index";
import increaseReducer from "./reducers/delayedReducers/increaseReducer";
import rootReducer from "./reducers/rootReducer";

const delayedMiddleware = createDelayMiddleware({
    config: [
        {
            type: 'INCREASE',
            reducer: increaseReducer
        }
    ]
});


const store = createStore(rootReducer, applyMiddleware(delayedMiddleware));

export default store;