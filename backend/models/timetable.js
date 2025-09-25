const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  degree: {
    type: String,
    enum: ["Physical Science", "Bio Science", "Computer Science"],
    required: true,
  },
  level: { type: Number, enum: [1, 2, 3], required: true },
  semester: { type: Number, enum: [1, 2], required: false },
  subjectCode: { type: String, required: true },
  subjectName: { type: String, required: true },
  timeSlot: {
    start: { type: String },
    end: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Timetable", timetableSchema);
