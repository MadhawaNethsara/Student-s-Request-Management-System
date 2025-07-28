const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        maxlength: 255
    },
    role: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        maxlength: 15
    },
});
module.exports = mongoose.model('Mentor', mentorSchema);

