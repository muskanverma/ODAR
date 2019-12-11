const mongoose = require('mongoose');
// const User = require('./User');

const ReminderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    email:{
        type: String
    },
    text: {
        type: String,
    },
    date: {
        type: Date,
        default: new Date()
    }
});
module.exports = mongoose.model('reminder',ReminderSchema);