const mongoose = require('mongoose');
// const User = require('./User');

const NoteSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    heading: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
    rating: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('note',NoteSchema);
