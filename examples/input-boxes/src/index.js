import nameChangeHandler from './nameChangeHandler';
import "./styles.css";
import { UPDATE_NAME } from "./actionTypes";
import store from './store/store';

window.increaseCount = () => store.dispatch({
    type: 'INCREASE',
    payload: 1
});

const el = document.createElement('div');
el.innerHTML = 'Click the button to see the delayed changes';
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
