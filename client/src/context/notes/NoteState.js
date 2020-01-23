import React, { useReducer } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import noteReducer from './noteReducer';

import NoteContext from './noteContext';
import {
	GET_NOTES,
	ADD_NOTE,
	DELETE_NOTE,
	UPDATE_NOTE,
	NOTE_ERROR,
	SET_CURRENT,
	CLEAR_CURRENT
} from '../types';

const NoteState = props => {
	const initialState = {
		notes: [],
		loading: false,
		current: null
		// error: null
	};
	const [state, dispatch] = useReducer(noteReducer, initialState);
	// GET ALL NOTES
	const getNotes = async () => {
		try {
			const res = await axios.get('/api/notes');
			dispatch({ type: GET_NOTES, payload: res.data });
		} catch (err) {
			dispatch({ type: NOTE_ERROR, payload: err.response.msg });
		}
	};
	// ADD A NOTE
	const addNote = async newNote => {
		//newNote.id = uuid.v4();
		// dispatch({ type: ADD_NOTE, payload: newNote });
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/notes', newNote, config);
			dispatch({ type: ADD_NOTE, payload: res.data });
		} catch (err) {
			dispatch({ type: NOTE_ERROR, payload: err.response.msg });
		}
	};
	//DELETE NOTE
	const deleteNote = async id => {
		// dispatch({ type: DELETE_NOTE, payload: id });
		try {
			await axios.delete(`/api/notes/${id}`);
			dispatch({ type: DELETE_NOTE, payload: id });
		} catch (err) {
			dispatch({ type: NOTE_ERROR, payload: err.response.msg });
		}
	};
	// // update A NOTE
	const updateNote = async noteToBeEdited => {
		// dispatch({ type: UPDATE_NOTE, payload: noteToBeEdited });

		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		};
		try {
			const res = await axios.put(
				`/api/notes/${noteToBeEdited._id}`,
				noteToBeEdited,
				config
			);
			dispatch({ type: UPDATE_NOTE, payload: res.data });
		} catch (err) {
			dispatch({ type: NOTE_ERROR, payload: err.response.msg });
		}
	};
	const setCurrent = note => {
		dispatch({ type: SET_CURRENT, payload: note });
	};
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};
	return (
		<NoteContext.Provider
			value={{
				notes: state.notes,
				current: state.current,
				// error: state.error,
				getNotes,
				addNote,
				updateNote,
				deleteNote,
				setCurrent,
				clearCurrent
			}}
		>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
