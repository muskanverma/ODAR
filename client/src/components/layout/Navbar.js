import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { Form, Button, Col, Row, Nav, NavDropdown } from 'react-bootstrap';

const Navbar = () => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, logout, user } = authContext;
	const onLogout = () => {
		logout();
	};
	useEffect(() => {
		if (localStorage.token) {
			authContext.loadUser();
		}
	}, []);
	const authLinks = () => {
		return (
			<Fragment>
				<Nav className='mr-auto'>
					<Nav.Link>
						<Link to='/'>
							Home<span className='sr-only'>(current)</span>
						</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to='/about'>About</Link>
					</Nav.Link>
					<NavDropdown title='Notes' id='basic-nav-dropdown'>
						<NavDropdown.Item>
							<Nav.Link>
								<Link to='mynotes'>My Notes</Link>
							</Nav.Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Nav.Link>
								<Link to='newnote'>Add a Note</Link>
							</Nav.Link>
						</NavDropdown.Item>
					</NavDropdown>
					<NavDropdown title='Reminders' id='basic-nav-dropdown'>
						<NavDropdown.Item>
							<Nav.Link>
								<Link to='myreminders'>My Reminders</Link>
							</Nav.Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Nav.Link>
								<Link to='newreminder'>Add a new Reminder</Link>
							</Nav.Link>
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Nav className='float-right'>
					<Nav.Link>Hello {user && user.name} </Nav.Link>
					<Nav.Link>
						{/* <Link to='/logout'>
						<i className='fas fa-sign-out-alt'></i>{' '}
						<span className='hide-sm'>Logout</span>
					</Link> */}
						<a href='#!' onClick={onLogout}>
							<i className='fas fa-sign-out-alt'></i>{' '}
							<span className='hide-sm'>Logout</span>
						</a>
					</Nav.Link>
				</Nav>
				{/* <li className='nav-item'>
					<a href='#!' onClick={onLogout}>
						<i className='fas fa-sign-out-alt'></i>{' '}
						<span className='hide-sm'>Logout</span>
					</a>
				</li>
				<li className='nav-item'> Hello {user && user.name}</li> */}
			</Fragment>
		);
	};
	const guestLinks = () => {
		return (
			<Fragment>
				<Nav className='mr-auto'>
					<Nav.Link>
						<Link to='/register'>Sign Up</Link>
					</Nav.Link>
					&nbsp;
					<Nav.Link>
						<Link to='/login'>Sign In</Link>
					</Nav.Link>
				</Nav>
			</Fragment>
		);
	};
	return (
		// <Navbar bg='light' expand='lg'>
		// 	<div className='navbar-brand' style={{ fontSize: '24px' }}>
		// 		<i className='far fa-sticky-note fa-3x'></i>
		// 	</div>
		// 	<Navbar.Brand href='#home'>ODAR</Navbar.Brand>
		// 	<Navbar.Toggle aria-controls='basic-navbar-nav' />
		// 	<Navbar.Collapse id='basic-navbar-nav'>
		// 		<Nav className='mr-auto'>
		// 			{isAuthenticated ? (
		// 				<div>
		// 					<Nav.Link>Home</Nav.Link>
		// 					<Nav.Link href='#link'>Link</Nav.Link>
		// 					<NavDropdown title='Dropdown' id='basic-nav-dropdown'>
		// 						<NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
		// 						<NavDropdown.Item href='#action/3.2'>
		// 							Another action
		// 						</NavDropdown.Item>
		// 						<NavDropdown.Item href='#action/3.3'>
		// 							Something
		// 						</NavDropdown.Item>
		// 						<NavDropdown.Divider />
		// 						<NavDropdown.Item href='#action/3.4'>
		// 							Separated link
		// 						</NavDropdown.Item>
		// 					</NavDropdown>
		// 				</div>
		// 			) : (
		// 				<div>
		// 					<Nav.Link>
		// 						<Link to='/register'>Sign Up</Link>
		// 					</Nav.Link>
		// 					<Nav.Link>
		// 						<Link to='/login'>Sign In</Link>
		// 					</Nav.Link>
		// 				</div>
		// 			)}
		// 		</Nav>
		// 	</Navbar.Collapse>
		// </Navbar>

		<div className='container-fluid'>
			<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
				<div className='navbar-brand' style={{ fontSize: '12px' }}>
					<i className='far fa-sticky-note fa-3x'></i>
				</div>
				<a className='navbar-brand'>ODAR</a>
				<ul className={isAuthenticated ? 'navbar-nav' : 'navbar-nav ml-auto'}>
					{isAuthenticated ? authLinks() : guestLinks()}
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
