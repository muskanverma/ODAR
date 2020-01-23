import React, { useContext, useEffect } from 'react';
import ReminderContext from '../../context/reminders/reminderContext';
import ReminderItem from './ReminderItem';

const Reminders = () => {
	const reminderContext = useContext(ReminderContext);
	const { reminders, getReminders } = reminderContext;
	useEffect(() => {
		getReminders();
		//eslint-disable-next-line
	}, [reminders]);

	return (
		<div>
			{reminders.map(reminder => (
				<ReminderItem key={reminder._id} reminders={reminder} />
			))}
		</div>
	);
};

export default Reminders;
