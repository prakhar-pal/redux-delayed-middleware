/**Author: Prakhar Pal */

/**
 *
 * @param {Object} middlewareObj - the root object which should have config and might have optional params e.g. dispatchInterval
 * @param {Object} middlewareObj.reducers - config used to calculated initial state & subsequent states
 * @param {Function} middlewareObj.reducers.reducer - should be a reducer function which should give valid initial state
 * @param {Function} middlewareObj.reducers.id - it can be any valid action type, this action type will be used when dispatching delayed action with updated payload 
 * be dispatched after given time interval
 * @param {Number} middlewareObj.dispatchInterval - (Defaul=500ms) time after which the delayed action should be dispatched
 */
export default function createDelayMiddleware({ reducers, dispatchInterval = 500 }) {
    let timeoutId = null;
    let currentState = reducers.reduce((out, action)=> ({
        ...out,
        [action.id]: {
            ...action,
            value: action.reducer(),
        }
    }), {});

    const delayMiddleWare = ({ dispatch }) => next => action => {
        const actionId = action.id;
        const currentValue = actionId && currentState[actionId];
        if(currentValue){
            const updatedValue = currentValue.reducer(currentValue.value, action);
            currentState = {
                ...currentState,
                [actionId]: {
                    ...currentValue,
                    value: updatedValue
                }
            }
            if(timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                dispatch({
                    type: actionId,
                    payload: updatedValue
                });
            }, dispatchInterval);
        }
        next(action);
    } 
    return delayMiddleWare; 
}

