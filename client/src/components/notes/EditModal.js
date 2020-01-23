import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import NoteForm from './NoteForm';
const EditModal = props => {
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			{/* <Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Modal heading
				</Modal.Title>
			</Modal.Header> */}
			<Modal.Body>
				<NoteForm edit={true} onHide={props.onHide} />
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Body>
			{/* <Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer> */}
		</Modal>
	);
};

export default EditModal;
