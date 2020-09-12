import nameChangeHandler from './nameChangeHandler';
import "./styles.css";
import { UPDATE_NAME, UPDATED_COUNTER, DECREASE_COUNTER, INCREASE_COUNTER } from "./actionTypes";
import store from './store/store';

window.increaseCount = () => store.dispatch({
    type: INCREASE_COUNTER,
    id: UPDATED_COUNTER,
    payload: 1
});

window.decreaseCount = () => store.dispatch({
    type: DECREASE_COUNTER,
    id: UPDATED_COUNTER,
    payload: 1
});


const el = document.createElement('div');
el.innerHTML = store.getState().counter;
el.style.paddingTop = '3rem';
document.body.append(el);

store.subscribe(() => {
    el.innerHTML = JSON.stringify(store.getState().counter);
});

const updateName = nameChangeHandler(value => store.dispatch({
    type: UPDATE_NAME,
    payload: value
}));
store.subscribe(()=>{
    
})
