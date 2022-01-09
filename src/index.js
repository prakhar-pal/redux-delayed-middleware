/*
 *
 * Author: Prakhar Pal
 * License: MIT
 *
 */

/**
 * @method delayMiddleware
 * @param {Object} store - store
 * @param {Function} store.dispatch - store's dispatch function
 * @returns {Object} - returned by next function
 */

const delayMiddleware = ({ dispatch }) => (next) => (action) => {
  if (typeof action === typeof Object() && action.shouldDelay) {
    const newAction = { ...action, shouldDelay: false };
    // delay the dispatching of this action until main thread becomes free
    return setTimeout(() => {
      dispatch(newAction);
    }, action.delayBy || 0);
  }
  return next(action);
};

export default delayMiddleware;

/**
 * @method createDelayMiddleware
 * @param {Object} middlewareObj - the root object which should have reducers config and may have optional params
 * @param {Object} middlewareObj.reducers - config used to calculated initial state & subsequent states
 * @param {Function} middlewareObj.reducers.reducer - a reducer function
 * @param {String} middlewareObj.reducers.type - it can be any valid action type, this action type will be used when
 * dispatching delayed action with updated payload
 * @param {Number} middlewareObj.delayBy - (Defaul=0ms) time after which the delayed action should be dispatched
 */
export function createDelayMiddleware({ reducers, delayBy = 0 }) {
  let timeoutId = null;
  let currentState = reducers.map((reducerDetails) => ({
    ...reducerDetails,
    value: reducerDetails.reducer(),
  }));

  const delayMiddleWare = ({ dispatch }) => (next) => (action) => {
    if (typeof action === typeof Object() && action.shouldDelay) {
      currentState = currentState.map((stateDetails) => ({
        ...stateDetails,
        value: stateDetails.reducer(stateDetails.value, action)
      }));
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        currentState.forEach((stateDetails) => {
          dispatch({
            type: stateDetails.type,
            payload: stateDetails.value,
          });
        });
      }, delayBy);
    }
    next(action);
  };
  return delayMiddleWare;
}
