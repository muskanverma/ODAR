import React, { useContext, useState, useEffect } from 'react';
import ReminderContext from '../../context/reminders/reminderContext';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const ReminderForm = () => {
	const reminderContext = useContext(ReminderContext);
	const { addReminder } = reminderContext;

	const [reminder, setReminder] = useState({
		text: '',
		date: '',
		time: null
	});

	const { text, date, time } = reminder;

	const onChange = e => {
		setReminder({ ...reminder, [e.target.name]: e.target.value });
	};
	const dateFormat = () => {
		var d1 = new Date();
		var d =
			d1.getFullYear() +
			'-' +
			(d1.getMonth() + 1 < 10 ? '0' : '') +
			(d1.getMonth() + 1) +
			'-' +
			(d1.getDate() < 10 ? '0' : '') +
			d1.getDate() +
			' ' +
			(d1.getHours() < 10 ? '0' : '') +
			d1.getHours() +
			':' +
			(d1.getMinutes() < 10 ? '0' : '') +
			d1.getMinutes();
		return d;
	};
	const checkTime = time => {
		if (time % 5 == 0) {
			//console.log(time % 5);
			return 1;
		} else return 0;
	};
	const onSubmit = e => {
		e.preventDefault();
		if (checkTime(time.slice(3, 5)) == 0) {
			alert('Time can be in intervals of 5 only');
		} else {
			//const d = new Date(date.slice(0,4),date.slice(5,7)-1,date.slice(8,10),time.slice(0,2),time.slice(3,5));
			//console.log(date.substr(8,9));
			// const d = new Date(date.substr(0,4),date.substr(6,7),date.substr(9,10));
			// console.log(d);

			//setReminder({...reminder , date: new Date(date.slice(0,4),date.slice(5,7)-1,date.slice(8,10),time.slice(0,2),time.slice(3,5))});

			const d = reminder.date + ' ' + reminder.time;
			//console.log(d);
			//var d1 = new Date();
			//var d = d1.getFullYear()+'-'+(d1.getMonth()+1)+'-'+d1.getDate()+' '+d1.getHours()+':'+d1.getMinutes();
			//console.log(d);

			//console.log(dateFormat());
			addReminder({
				text: text,
				date: d
			});
			toast('Reminder Added !');
			setReminder({
				text: '',
				time: null,
				date: new Date()
			});
		}
	};

	return (
		<div>
			<Form onSubmit={onSubmit}>
				<Form.Group>
					<Form.Label>Add a Label</Form.Label>
					<Form.Control
						type='text'
						name='text'
						value={text}
						onChange={onChange}
						placeholder='enter label'
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Date</Form.Label>
					<Form.Control
						type='date'
						name='date'
						value={date}
						onChange={onChange}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Time</Form.Label>
					<Form.Control
						type='time'
						name='time'
						value={time}
						step='300'
						onChange={onChange}
					/>
				</Form.Group>
				<Button
					variant='primary'
					type='submit'
					value='Add Reminder'
					className='btn btn-dark'
				>
					Save
				</Button>
				{/* <form onSubmit={onSubmit}>
				<label>
					Add a Label
					<input
						type='text'
						name='text'
						value={text}
						onChange={onChange}
						placeholder='enter label'
					/>
				</label>

				<label>
					Date
					<input type='date' name='date' value={date} onChange={onChange} />
				</label>
				<label>
					time
					<input
						type='time'
						name='time'
						value={time}
						step='300'
						onChange={onChange}
					/>
				</label>
				<input type='submit' value='Add Reminder' className='btn btn-dark' /> */}
			</Form>
		</div>
	);
};

export default ReminderForm;

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
