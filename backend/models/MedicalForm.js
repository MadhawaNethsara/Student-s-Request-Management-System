const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  date: { type: Date, required: true },
});

const MedicalSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    regNumber: {
      type: String,
      required: true,
      maxlength: 100,
    },
    year: {
      type: String,
      required: true,
      maxlength: 10,
    },
    level: {
      type: String,
      required: true,
      maxlength: 10,
    },
    semester: {
      type: String,
      required: true,
      maxlength: 10,
    },
    degree: {
      type: String,
      required: true,
      maxlength: 100,
    },
    contactNumber: {
      type: String,
      required: true,
      maxlength: 15,
    },

    subject: [subjectSchema],

    medicalSlip: {
      type: String,
      required: true,
    },

    // 🔹 Workflow fields
    status: {
      type: String,
      enum: [
        "submitted",
        "mentor_approved",
        "mentor_rejected",
        "doctor_approved",
        "doctor_rejected",
        "committee_approved",
        "committee_rejected",
      ],
      default: "submitted",
    },
    rejectionReason: {
      type: String,
      maxlength: 500, // optional field for rejection notes
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MedicalForm", MedicalSchema);
