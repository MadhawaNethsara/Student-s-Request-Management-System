const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    enum: ['student', 'mentor', 'doctor', 'admin', 'committee'],
    required: true
  },
  registration_number: {
    type: String,
    maxlength: 20
  },
  year: {
    type: String,
    maxlength: 10 
  },
  level: {
    type: String,
    maxlength: 10
  },
  semester: {
    type: String,
    maxlength: 10
  },
  degree: {
    type: String,
    maxlength: 100
  },
  contact_number: {
    type: String,
    maxlength: 15
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
