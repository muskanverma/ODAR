import {
	GET_NOTES,
	ADD_NOTE,
	DELETE_NOTE,
	UPDATE_NOTE,
	NOTE_ERROR,
	SET_CURRENT,
	CLEAR_CURRENT
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_NOTES:
			return {
				...state,
				notes: action.payload,
				loading: false
			};
		case ADD_NOTE:
			return {
				...state,
				notes: [...state.notes, action.payload],
				loading: false
			};
		case DELETE_NOTE:
			return {
				...state,
				notes: state.notes.filter(note => note._id !== action.payload),
				loading: false
			};
		case UPDATE_NOTE:
			return {
				...state,
				notes: state.notes.map(note =>
					note._id === action.payload._id ? action.payload : note
				),
				loading: false
			};
		case NOTE_ERROR:
			return {
				...state,
				error: action.payload
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};
		default:
			return state;
	}
};
