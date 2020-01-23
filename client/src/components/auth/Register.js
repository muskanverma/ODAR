import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import { contextsSymbol } from 'express-validator/src/base';
import { Form, Button } from 'react-bootstrap';
const Register = props => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		phone: 0
	});
	const { name, email, password, phone } = user;
	const authContext = useContext(AuthContext);
	const { registerUser, error, clearErrors, isAuthenticated } = authContext;
	useEffect(() => {
		// if (isAuthenticated) {
		// 	props.history.push('/');
		// }
		if (error != null || error != undefined) {
			alert(error);
			clearErrors();
		}
		// eslint-disable-next-line
	}, []);
	const onChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const onSubmit = e => {
		e.preventDefault();
		registerUser(user);
		if (error != null || error != undefined) {
			alert(error);
			clearErrors();
		} else {
			alert('Registered Successfully, Sign-In to continue!');
		}
		setUser({
			name: '',
			email: '',
			password: '',
			phone: 0
		});
	};

	return (
		<div className='loginPageContainer'>
			<img
				className='loginImage'
				src='https://img3.goodfon.com/wallpaper/nbig/a/89/krzhuka-ruchka-tetrad.jpg'
			/>

			<Form onSubmit={onSubmit} className='registerForm'>
				<div className='centertext'>
					<h2>
						<b className='text-center'>Sign up to get started !</b>
					</h2>

					<br />
					<br />
				</div>
				<Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						name='name'
						placeholder='Enter name'
						onChange={onChange}
						value={name}
						required
					/>
					{/* <Form.Text className='text-muted'>
					We'll never share your email with anyone else.
				</Form.Text> */}
				</Form.Group>
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						name='email'
						placeholder='Enter email'
						onChange={onChange}
						value={email}
						required
					/>
				</Form.Group>
				<Form.Group>
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
				<Form.Group>
					<Form.Label>Phone number</Form.Label>
					<Form.Control
						type='number'
						name='phone'
						placeholder='Enter Phone no.'
						maxLength='10'
						onChange={onChange}
						value={phone}
						required
					/>
				</Form.Group>
				<Button variant='primary' type='submit' value='Register'>
					Sign up
				</Button>
			</Form>
		</div>
	);
};

export default Register;

{
	/* <form onSubmit={onSubmit}>
				<label>
					Name
					<input
						type='text'
						name='name'
						placeholder='Enter name'
						onChange={onChange}
						value={name}
					/>
				</label>
				<label>
					Email
					<input
						type='email'
						name='email'
						placeholder='Enter email'
						onChange={onChange}
						value={email}
					/>
				</label>
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
				<label>
					Phone No
					<input
						type='number'
						name='phone'
						placeholder='Enter Phone no.'
						maxLength='10'
						onChange={onChange}
						value={phone}
					/>
				</label>
				<input type='submit' value='Register' /> */
}
{
	/* <Form>
	<Form.Group controlId='formBasicEmail'>
		<Form.Label>Email address</Form.Label>
		<Form.Control type='email' placeholder='Enter email' />
		<Form.Text className='text-muted'>
			We'll never share your email with anyone else.
		</Form.Text>
	</Form.Group>

	<Form.Group controlId='formBasicPassword'>
		<Form.Label>Password</Form.Label>
		<Form.Control type='password' placeholder='Password' />
	</Form.Group>
	<Form.Group controlId='formBasicCheckbox'>
		<Form.Check type='checkbox' label='Check me out' />
	</Form.Group>
	<Button variant='primary' type='submit'>
		Submit
	</Button>
</Form>; */
}
