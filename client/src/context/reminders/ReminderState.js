import React, { useReducer } from 'react';
import axios from 'axios';
import uuid from 'uuid';

import reminderReducer from './reminderReducer';
import ReminderContext from './reminderContext';
import {
	GET_REMINDERS,
	ADD_REMINDER,
	DELETE_REMINDER,
	REMINDER_ERROR
} from '../types';

const ReminderState = props => {
	const initialState = {
		reminders: [],
		loading: false
	};
	const [state, dispatch] = useReducer(reminderReducer, initialState);
	// GET ALL REMINDERS
	const getReminders = async () => {
		try {
			const res = await axios.get('/api/reminders');
			dispatch({ type: GET_REMINDERS, payload: res.data });
		} catch (err) {
			dispatch({ type: REMINDER_ERROR, payload: err.response.msg });
		}
	};
	// ADD A REMINDER
	const addReminder = async newReminder => {
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/reminders', newReminder, config);
			dispatch({ type: ADD_REMINDER, payload: res.data });
		} catch (err) {
			dispatch({ type: REMINDER_ERROR, payload: err.response.msg });
		}
	};
	//DELETE REMINDER
	const deleteReminder = async id => {
		try {
			await axios.delete(`/api/reminders/${id}`);
			dispatch({ type: DELETE_REMINDER, payload: id });
		} catch (err) {
			dispatch({ type: REMINDER_ERROR, payload: err.response.msg });
		}
	};
	return (
		<ReminderContext.Provider
			value={{
				reminders: state.reminders,
				getReminders,
				addReminder,
				deleteReminder
			}}
		>
			{props.children}
		</ReminderContext.Provider>
	);
};

export default ReminderState;
