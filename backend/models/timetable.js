// models/Timetable.js
import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  degree: {
    type: String,
    enum: ["Physical Science", "Bio Science", "Computer Science"],
    required: true,
  },
  level: {
    type: Number,
    enum: [1, 2, 3], // Year levels
    required: true,
  },
  semester: {
    type: Number,
    enum: [1, 2],
    required: false, // optional if not always needed
  },
  subjectCode: {
    type: String,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  lecturer: {
    type: String,
    required: false, // optional
  },
  timeSlot: {
    start: { type: String }, // e.g., "09:00 AM"
    end: { type: String },   // e.g., "11:00 AM"
  },
  location: {
    type: String, // lecture hall / lab
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Timetable", timetableSchema);
