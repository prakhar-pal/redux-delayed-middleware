/**
 * Author: Prakhar Pal 
 * License: MIT
 * */

const delayMiddleware = ({ dispatch }) => next => action => {
    if (typeof action === typeof Object() && action.shouldDelay) {
        action.shouldDelay = false;
        // delay the dispatching of this action until main thread becomes free
        setTimeout(() => {
            dispatch(action);
        }, action.delayBy || 0);
        next({ type: "@redux-delayed-middleware", payload: action });
    } else {
        next(action);
    }
}

export default delayMiddleware;


/**
 *
 * @param {Object} middlewareObj - the root object which should have reducers config and may have optional params e.g. delayBy
 * @param {Object} middlewareObj.reducers - config used to calculated initial state & subsequent states
 * @param {Function} middlewareObj.reducers.reducer - should be a reducer function which should give valid initial state
 * @param {Function} middlewareObj.reducers.id - it can be any valid action type, this action type will be used when dispatching delayed action with updated payload 
 * be dispatched after given time interval
 * @param {Number} middlewareObj.delayBy - (Defaul=500ms) time after which the delayed action should be dispatched
 */
export function createDelayMiddleware({ reducers, delayBy = 500 }) {
    let timeoutId = null;
    let currentState = reducers.map(reducerDetails => ({
        ...reducerDetails,
        value: reducerDetails.reducer()
    }));

    const delayMiddleWare = ({ dispatch }) => next => action => {
        if (typeof action === typeof Object() && action.shouldDelay) {
            currentState = currentState.map(stateDetails => ({ ...stateDetails, value: stateDetails.reducer(stateDetails.value, action) }));
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                currentState.forEach(stateDetails => {
                    dispatch({
                        type: stateDetails.type,
                        payload: stateDetails.value
                    });
                })
            }, delayBy);
        }
        next(action);
    }
    return delayMiddleWare;
}

