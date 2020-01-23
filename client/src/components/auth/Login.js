import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

const Login = props => {
	const [user, setUser] = useState({
		email: null,
		password: null
	});
	const { email, password } = user;
	const authContext = useContext(AuthContext);
	const { loginUser, error, clearErrors, isAuthenticated } = authContext;
	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/');
		}
		if (error != null || error != undefined) {
			alert(error);
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);
	const onChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const onSubmit = e => {
		e.preventDefault();
		if (error != null || error != undefined) {
			alert(error);
		} else {
			loginUser(user);
		}
	};

	return (
		<div className='loginPageContainer'>
			<img
				className='loginImage'
				src='https://img3.goodfon.com/wallpaper/nbig/a/89/krzhuka-ruchka-tetrad.jpg'
			/>
			<div className='loginCard'>
				<Form onSubmit={onSubmit}>
					<div className='centertext'>
						<h4>
							<b className='text-center'>Sign in to get started !</b>
						</h4>
						<br />
					</div>
					<Form.Group controlId='formBasicEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='email'
							name='email'
							placeholder='Enter email'
							onChange={onChange}
							value={email}
							required
						/>
						<Form.Text className='text-muted'>
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>
					<Form.Group controlId='formBasicPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							name='password'
							placeholder='Enter password'
							onChange={onChange}
							value={password}
							required
						/>
					</Form.Group>
					<Button
						className='centertext'
						variant='primary'
						type='submit'
						value='Login'
					>
						Login
					</Button>
					{/* <input type='submit' value='Login' /> */}
					{/* <label>
							Email
							<input
								type='email'
								name='email'
								placeholder='Enter email'
								onChange={onChange}
								value={email}
							/> */}
					{/* </label> */}
					{/* <br></br>
						<label>
							Password
							<input
								type='password'
								name='password'
								placeholder='Enter password'
								onChange={onChange}
								value={password}
							/>
						</label>
						<br></br>
						<input type='submit' value='Login' /> */}
				</Form>
			</div>
		</div>
	);
};

export default Login;
