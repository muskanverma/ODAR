import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ReminderContext from '../../context/reminders/reminderContext';
import '../../app.css';
const ReminderItem = ({ reminders }) => {
	const { _id, text, date } = reminders;
	const reminderContext = useContext(ReminderContext);
	const { deleteReminder } = reminderContext;
	const onDelete = () => {
		deleteReminder(_id);
	};

	return (
		<div className='card border-light mb-3' style={{ width: '100%' }}>
			<div className='card-header'>
				<span className='font-weight-bold' style={{ fontSize: '30px' }}>
					{text}
				</span>

				<p className='float-right'>
					<button className='btn btn-danger btn-md ' onClick={onDelete}>
						<i class='fas fa-trash-alt'></i>
					</button>
				</p>
				<p>{date}</p>
			</div>
		</div>
	);
};

ReminderItem.propTypes = {
	reminders: PropTypes.object.isRequired
};

export default ReminderItem;
