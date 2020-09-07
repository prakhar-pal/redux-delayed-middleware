/**
 *
 * @param { type, reducer }[] param
 * 
 * @param number timeout termination interval
 * @param number dispatch interval
 */
export default function createDelayMiddleware(config){
    let timeoutId = null;
    const dispatchInterval = 500;
    let currentValues = config.reduce((out, obj)=> ({
        ...out,
        [obj.type]: {
            value: obj.reducer(),
            reducer: obj.reducer
        }
    }), {});
    const delayMiddleWare = ({ dispatch, getState }) => next => action => {
        // console.log('Got action', action);
        const currentValue = currentValues[action.type];
        if(currentValue){
            // console.log('handling action', currentValues[action.type].reducer);
            currentValues = {
                ...currentValues,
                [action.type]: {
                    ...currentValue,
                    value: currentValues[action.type].reducer(currentValues[action.type].value, action)
                }
            }
            if(timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                dispatch({
                    type: `${action.type}_DELAYED`,
                    payload: currentValues[action.type].value
                });
            }, dispatchInterval);
        }
        next(action);
    } 
    return delayMiddleWare; 
}