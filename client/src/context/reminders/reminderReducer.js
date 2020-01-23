import {
	GET_REMINDERS,
	ADD_REMINDER,
	DELETE_REMINDER,
	REMINDER_ERROR
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_REMINDERS:
			return {
				...state,
				reminders: action.payload,
				loading: false
			};
		case ADD_REMINDER:
			return {
				...state,
				reminders: [...state.reminders, action.payload],
				loading: false
			};
		case DELETE_REMINDER:
			return {
				...state,
				reminders: state.reminders.filter(
					reminder => reminder._id !== action.payload
				),
				loading: false
			};
		case REMINDER_ERROR:
			return {
				...state,
				error: action.payload
			};

		default:
			return state;
	}
};
