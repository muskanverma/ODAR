import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';

import About from './components/pages/About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Notes from './components/notes/Notes';
import NoteForm from './components/notes/NoteForm';
import AuthState from './context/auth/AuthState';
import AuthContext from './context/auth/authContext';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import ReminderForm from './components/reminders/ReminderForm';
import Reminders from './components/reminders/Reminders';
import ReminderState from './context/reminders/ReminderState';
import './app.css';
if (localStorage.token) {
	setAuthToken(localStorage.token);
}
const App = () => {
	return (
		<div className='container-fluid'>
			<AuthState>
				<NoteState>
					<ReminderState>
						<Router>
							<div className='row'>
								<Navbar />
							</div>
							<div className='row'>
								<div className='col-12'>
									<div className='paddingTop'>
										<Switch>
											<PrivateRoute exact path='/' component={Home} />

											<Route exact path='/about' component={About} />
											<PrivateRoute exact path='/mynotes' component={Notes} />
											<PrivateRoute
												exact
												path='/newnote'
												component={NoteForm}
											/>
											<PrivateRoute
												exact
												path='/newreminder'
												component={ReminderForm}
											/>
											<PrivateRoute
												exact
												path='/myreminders'
												component={Reminders}
											/>
											<Route exact path='/register' component={Register} />
											<Route exact path='/login' component={Login} />
										</Switch>
									</div>
								</div>
							</div>
						</Router>
					</ReminderState>
				</NoteState>
			</AuthState>
		</div>
	);
};

export default App;
