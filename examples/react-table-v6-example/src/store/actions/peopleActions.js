import { GET_PEOPLE, UPDATE_PEOPLE } from "./actionTypes";
import { getData } from "../../utils";

export const getPeople = (count=100) => ({
	type: GET_PEOPLE,
	payload: getData(count)
});

export const updatePeople = person => {
	return ({
		type: UPDATE_PEOPLE,
		accumulate: true,
		payload: person
	});
};