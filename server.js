const express = require('express');
const connectDB = require('./config/db');
const app = express();
//const Agenda = require('agenda');


// Connect to database
connectDB();

// Initialising Middleware for req.body
app.use(express.json({extended: false})); // bs aab intialise krdiya to koi scene ni req.body use krio jao chlega vo


//defining routes
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.use('/api/reminders',require('./routes/reminders'));






const PORT = process.env.PORT || 8000;

app.listen(PORT,() => console.log(`server started on port ${PORT}`));
