import { createStore, applyMiddleware, compose } from "redux";
import delayMiddleware from "../../../../src/index";
import rootReducer from "./reducers/rootReducer";
export default function configureStore() {
	const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(rootReducer, composeEnhancer(applyMiddleware(delayMiddleware)));
	return store;
}