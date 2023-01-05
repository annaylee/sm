// The value of the 'required' is a function that returns a boolean
// Don't just set 'required': true or get mongoose validation errors

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: function(){ return this.length > 0; }
     },
    email: {
        type: String, 
        trim: true,
        lowercase: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Invalid Email'],
        required: function(){ return this.length > 0; }
     },
    password: {
        type: String,
        trim: true,
        required: function(){ return this.length > 6; }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);