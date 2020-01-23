import React, { useContext, useState, useEffect } from 'react';
import NoteContext from '../../context/notes/noteContext';
import { Form, Button, Col, Row } from 'react-bootstrap';

const NoteForm = ({ edit, onHide }) => {
	const noteContext = useContext(NoteContext);
	const { addNote, updateNote, current, clearCurrent } = noteContext;

	useEffect(() => {
		if (current !== null) {
			setNote(current);
		}
	}, [current]);

	const [note, setNote] = useState({
		heading: '',
		content: '',
		date: new Date(),
		rating: 10
	});

	const { heading, content, date, rating } = note;

	const onChange = e => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		if (current && edit) {
			updateNote(note);
			onHide();
			//hide hone se phle edit note vla button add note mei chng ho ra hai.
		} else {
			addNote(note);
		}
		setNote({
			heading: '',
			content: '',
			date: new Date(),
			rating: 10
		});
		clearCurrent();
	};

	return (
		<div>
			<Form onSubmit={onSubmit}>
				<h2 className='centertext'>Add a New Note</h2>
				<Form.Group>
					<Form.Label>Heading</Form.Label>
					<Form.Control
						type='text'
						name='heading'
						value={heading}
						onChange={onChange}
						placeholder='enter heading'
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Content</Form.Label>
					<Form.Control
						as='textarea'
						rows='10'
						name='content'
						value={content}
						onChange={onChange}
						placeholder='How was your day ???'
					/>
				</Form.Group>
				<Form.Group>
					<Form.Row>
						<Col>
							<Form.Label>Date</Form.Label>
							<Form.Control
								type='date'
								name='date'
								value={date}
								onChange={onChange}
							/>
						</Col>
						<Col>
							<Form.Label>Give Rating to your Day</Form.Label>

							<Form.Control
								type='number'
								min='1'
								max='10'
								name='rating'
								value={rating}
								onChange={onChange}
								placeholder='give rating to ur day'
							/>
						</Col>
					</Form.Row>
				</Form.Group>
				<Button
					variant='primary'
					type='submit'
					value={current != null && edit ? 'Edit Note' : 'Add Note'}
					className='btn btn-dark'
				>
					I'm Done
				</Button>
				{/* <label>
					heading
					<input
						type='text'
						name='heading'
						value={heading}
						onChange={onChange}
						placeholder='enter heading'
					/>
				</label>
				<label>
					Content
					<input
						type='text'
						name='content'
						value={content}
						onChange={onChange}
						placeholder='enter content'
					/>
				</label>
				<label>
					Date
					<input type='date' name='date' value={date} onChange={onChange} />
				</label>
				<label>
					rating
					<input
						type='number'
						min='1'
						max='10'
						name='rating'
						value={rating}
						onChange={onChange}
						placeholder='give rating to ur day'
					/>
				</label>
				<input
					type='submit'
					value={current != null && edit ? 'Edit Note' : 'Add Note'}
					className='btn btn-dark'
				/> */}
			</Form>
		</div>
	);
};
NoteForm.defaultProps = {
	// heading: '',
	// content: '',
	// date: new Date(),
	// rating: 10
	edit: false
};
export default NoteForm;

{
	/* <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form> */
}
