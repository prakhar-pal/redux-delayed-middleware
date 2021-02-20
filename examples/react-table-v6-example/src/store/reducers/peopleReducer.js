import { GET_PEOPLE, UPDATE_PEOPLE } from "../actions/actionTypes";

export default function peopleReducer(state=[],action){
	switch(action.type){
		case GET_PEOPLE:
			return action.payload;
		case UPDATE_PEOPLE:
			const newPerson = action.payload;
			const person = state.find(d => d.id === newPerson.id);
			const position = state.indexOf(person);
			const newState = [...state.slice(0,position), newPerson, ...state.slice(position+1,state.length)];
			return newState;
		default:
			return state;
	}
}