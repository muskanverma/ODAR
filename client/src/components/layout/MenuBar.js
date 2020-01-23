import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { Nav } from 'react-bootstrap';
const MenuBar = () => {
	const authContext = useContext(AuthContext);
	useEffect(() => {
		authContext.loadUser();
	}, []);
	return (
		<div className='menubar'>
			<Nav defaultActiveKey='/home' className='flex-column'>
				<Nav.Link>
					<Link to='mynotes'>My Notes</Link>
				</Nav.Link>
				<Nav.Link>
					<Link to='newnote'>Add a Note</Link>
				</Nav.Link>
				<Nav.Link>
					<Link to='myreminders'>My Reminders</Link>
				</Nav.Link>
				<Nav.Link>
					<Link to='newreminder'>Add a new Reminder</Link>
				</Nav.Link>

				{/* <Link to='myreminders'>My Reminders</Link>
			<Link to='newreminder'>New Reminder</Link> */}
			</Nav>
		</div>
	);
};

export default MenuBar;
