import React, { useContext, useEffect } from 'react';
import NoteContext from '../../context/notes/noteContext';
import NoteItem from './NoteItem';
import NoteForm from './NoteForm';
import AuthContext from '../../context/auth/authContext';
const Notes = () => {
	const noteContext = useContext(NoteContext);
	const { notes, getNotes } = noteContext; // aise hi nikalte na?
	const authContext = useContext(AuthContext);
	const { loadUser } = authContext;
	useEffect(() => {
		getNotes();
		//eslint-disable-next-line
	}, [notes]);
	// const onClick = () => {
	// 	//<NoteForm />;
	// };

	return (
		<div>
			{notes.map(note => (
				<NoteItem key={note._id} notes={note} /> // yahan prop ka naam note hai to udhr bhi note hi nikalegi be
			))}

			{/* <button className='btn btn-primary btn-sm' onClick={onClick}>
				ADD NOTE
			</button> */}
		</div>
	);
};

export default Notes;
