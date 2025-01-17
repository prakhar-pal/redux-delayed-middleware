# redux-delayed-middleware

A [redux](https://redux.js.org) middleware to dispatch delayed actions

Note: built using node v14
### What it can do -

- Delay redux actions until "main thread becomes free",
- Prevent choppy UI by slowing down redux state updates,
- Allow configuring the actions to make batch updates and then dispatch an action for updated values

### Using default import -

Include the middleware while setting up the store

```javascript
import { applyMiddleware } from 'redux';
import delayedMiddleware from 'redux-delayed-middleware';
...

const middlewares = [/*rest of the middlewares*/, delayedMiddleware];
const store = createStore(reducers, applyMiddleware(...middlewares));
```
Then, an action can be dispatched like this -
``` javascript
dispatch({
    type: YOUR_ACTION,
    shouldDelay: true, //required
    delayBy: 0 //optional, default=0, should be in milliseconds
    //...rest of action details e.g. payload
});
```

### Using batch updates -
`redux-delayed-middleware` has a named export called `createDelayMiddleware` which can be used to leverage batch updates

```javascript
import { applyMiddleware } from 'redux';
import { createDelayMiddleware } from 'redux-delayed-middleware';
...
const reducers = [
    {
        type: ACTION_NAME, //this action will be dispatched after given timeout
        reducer: myCompositeReducer   
    }
]
const delayMiddleware2 = createDelayMiddleware({
    reducers,
    delayBy:500 //optional, default=500
})
```
and then `delayMiddleware2` from above can be included in the `createStore` function as we do for other middlewares.

### License
MIT
