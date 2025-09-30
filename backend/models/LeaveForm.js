const mongoose = require("mongoose");

const leaveFormSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: String,
  regNumber: String,
  year: String,
  level: String,
  semester: String,
  degree: String,
  contact: String,
  reason: String,
  details: String,
  proofDoc: String, // store filename from multer
  status: { type: String, default: "pending" },
  rejectionReason: String,
}, { timestamps: true });

module.exports = mongoose.model("LeaveForm", leaveFormSchema);
