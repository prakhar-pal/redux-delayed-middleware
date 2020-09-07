/**Author: Prakhar Pal */

/**
 *
 * @param {Object} middlewareObj - the root object which should have config and might have optional params e.g. dispatchInterval
 * @param {Object} middlewareObj.config - config used to calculated initial state & subsequent states
 * @param {Function} middlewareObj.config.reducer - should be a reducer function which should give valid initial state
 * @param {Function} middlewareObj.config.type - an action type e.g. if current action is ACTION then ACTION_DELAYED will 
 * be dispatched after given time interval
 * @param {Number} middlewareObj.dispatchInterval - (Defaul=500ms) time after which the delayed action should be dispatched
 */
export default function createDelayMiddleware({ config, dispatchInterval = 500 }) {
    let timeoutId = null;
    let currentState = config.reduce((out, obj)=> ({
        ...out,
        [obj.type]: {
            value: obj.reducer(),
            reducer: obj.reducer
        }
    }), {});
    const delayMiddleWare = ({ dispatch }) => next => action => {
        const currentValue = currentState[action.type];
        if(currentValue){
            currentState = {
                ...currentState,
                [action.type]: {
                    ...currentValue,
                    value: currentState[action.type].reducer(currentState[action.type].value, action)
                }
            }
            if(timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                dispatch({
                    type: `${action.type}_DELAYED`,
                    payload: currentState[action.type].value
                });
            }, dispatchInterval);
        }
        next(action);
    } 
    return delayMiddleWare; 
}