// import nameChangeHandler from './nameChangeHandler';
import "./styles.css";
import { UPDATED_COUNTER, DECREASE_COUNTER, INCREASE_COUNTER } from "./actionTypes";
import store from './store/store';

const BY_COUNT = 100;

const increaseCounterBtn = document.getElementById("increase_counter_btn");
const decreaseCounterBtn = document.getElementById("decrease_counter_btn");

const increaseCounterByBtn = document.getElementById("increase_counter_by_btn");
const decreaseCounterByBtn = document.getElementById("decrease_counter_by_btn");
const reduxLogsElement = document.getElementById("redux_logs");

increaseCounterBtn.onclick = () => store.dispatch({
    type: INCREASE_COUNTER,
    shouldDelay: true,
    payload: 1
});

decreaseCounterBtn.onclick = () => store.dispatch({
    type: DECREASE_COUNTER,
    shouldDelay: true,
    payload: 1
});

increaseCounterByBtn.onclick = () => {
    for (let i = 0; i < BY_COUNT; i++) {
        store.dispatch({
            type: INCREASE_COUNTER,
            id: UPDATED_COUNTER,
            shouldDelay: true,
            payload: 1
        });
    }
}

decreaseCounterByBtn.onclick = () => {

    for (let i = 0; i < BY_COUNT; i++) {
        store.dispatch({
            type: DECREASE_COUNTER,
            id: UPDATED_COUNTER,
            shouldDelay: true,
            payload: 1
        });
    }
}


const el = document.createElement('div');
el.innerHTML = store.getState().counter;
el.style.paddingTop = '3rem';
document.body.append(el);

let renderCount = 0;

store.subscribe(() => {
    renderCount++;
    el.innerHTML = `${JSON.stringify(store.getState().counter)}, rendered ${renderCount}`;
});

store.subscribe(() => {
    const reduxActions = store.getState().reduxActions;
    const countByActionType = Object.keys(reduxActions).map(key => ({
        action: key,
        count: reduxActions[key]
    }));
    reduxLogsElement.innerHTML = countByActionType.map(actionDetails => `
        <div>${actionDetails.action}: ${actionDetails.count}</div>
    `).join('');
})
