import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import NoteContext from '../../context/notes/noteContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditModal from '../notes/EditModal';
import '../../app.css';
toast.configure();
const NoteItem = ({ notes }) => {
	const [show, setShow] = useState(false);
	const { _id, heading, content, date, rating } = notes;
	const noteContext = useContext(NoteContext);
	const { deleteNote, setCurrent, clearCurrent } = noteContext;
	const onDelete = () => {
		deleteNote(_id);
		toast('Note Deleted !');
		clearCurrent();
	};
	const OnEditClick = () => {
		setCurrent(notes);
		setShow(true);
	};
	return (
		// <div>
		//  <h3>{heading}</h3>
		//  <p>{content}</p>
		//  <h4>{date}</h4>
		//  <p>rating: {rating}</p>
		//  <button className='btn btn-primary btn-sm' onClick={OnEditClick}>
		//      Show
		//  </button>
		//  &nbsp;
		//  <button className='btn btn-danger btn-sm' onClick={onDelete}>
		//      Delete
		//  </button>
		//  <EditModal show={show} onHide={() => setShow(false)} />
		// </div>
		// <div className="card" style={{widht: '100px'}}>
		//  <div className="card-header">
		//      <h3>{heading}</h3>
		//  </div>
		//  <div className="card-body">
		//  <h5>{date}</h5>
		//  <h5>rating: <span class="badge badge-pill badge-success">{rating}</span></h5>
		//  <p className="card-text">{content}</p>
		//  <button className='btn btn-primary btn-sm' onClick={OnEditClick}>
		//      Show
		//  </button>
		//  &nbsp;
		//  <button className='btn btn-danger btn-sm' onClick={onDelete}>
		//      Delete
		//  </button>
		//  <EditModal show={show} onHide={() => setShow(false)} />
		//  </div>
		// </div>
		<div className='card border-light mb-3' style={{ width: '100%' }}>
			<div className='card-header'>
				<span className='font-weight-bold' style={{ fontSize: '30px' }}>
					{heading}
				</span>
				rating:{' '}
				<span
					className={
						rating > 5
							? 'badge badge-pill badge-success'
							: 'badge badge-pill badge-danger'
					}
				>
					{rating}
				</span>
				<p className='float-right'>
					<button
						className='btn btn-primary btn-md'
						style={{ marginRight: '5px' }}
						onClick={OnEditClick}
					>
						<i class='fas fa-envelope-open-text'></i>
					</button>
					<button className='btn btn-danger btn-md ' onClick={onDelete}>
						<i class='fas fa-trash-alt'></i>
					</button>
				</p>
				<p>{date}</p>
			</div>
			<EditModal show={show} onHide={() => setShow(false)} />
		</div>
	);
};

NoteItem.propTypes = {
	notes: PropTypes.object.isRequired
};

export default NoteItem;
