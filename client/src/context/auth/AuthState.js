import React, { useReducer } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import AuthContext from './authContext';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: false,
		error: null
	};
	const [state, dispatch] = useReducer(authReducer, initialState);

	//load user
	const loadUser = async () => {
		// load token into global headers
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		try {
			const res = await axios.get('/api/auth');
			dispatch({ type: USER_LOADED, payload: res.data });
		} catch (err) {
			dispatch({ type: AUTH_ERROR });
		}
	};
	//register user
	const registerUser = async user => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/users', user, config);
			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
			//loadUser();
		} catch (err) {
			dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
		}
	};

	//login user
	const loginUser = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/auth', formData, config);
			dispatch({ type: LOGIN_SUCCESS, payload: res.data });
			loadUser();
		} catch (err) {
			dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
		}
	};

	//logout
	const logout = () => dispatch({ type: LOGOUT });
	//clear errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
	// const setCurrent = note => {
	//     dispatch({ type: SET_CURRENT, payload: note });
	// };
	// const clearCurrent = () => {
	//     dispatch({ type: CLEAR_CURRENT });
	// };
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error,
				user: state.user,
				token: state.token,
				registerUser,
				loadUser,
				loginUser,
				logout,
				clearErrors
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
