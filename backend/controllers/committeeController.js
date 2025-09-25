const bcrypt = require("bcrypt");
const MedicalForm = require("../models/MedicalForm");
const users = require("../models/users");
const sendEmail = require("../utils/sendEmail");

// 🔹 Committee Registration
exports.committeeRegistration = async (req, res) => {
  try {
    const { name, email, password, contact_number } = req.body;
    if (!name || !email || !password || !contact_number) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCommittee = new users({
      name,
      email,
      password: hashedPassword,
      role: "committee",
      contact_number,
    });

    await newCommittee.save();
    res.status(201).json({
      message: "Committee member registered successfully",
      committee: newCommittee,
    });
  } catch (error) {
    console.error("Error in Committee registration[POST]:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔹 Get all medical forms for Committee
exports.getAllMedicalForms = async (req, res) => {
  try {
    const forms = await MedicalForm.find()
      .populate("student", "name email regNumber") // populate student details
      .sort({ createdAt: -1 });

    res.json({ success: true, forms });
  } catch (error) {
    console.error("Error fetching medical forms:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// 🔹 Committee Review – Approve/Reject
exports.reviewMedicalForm = async (req, res) => {
  try {
    const { action, reason } = req.body;
    const formId = req.params.id;

    const form = await MedicalForm.findById(formId).populate("student", "name email");
    if (!form) return res.status(404).json({ success: false, error: "Form not found" });

    if (action === "approve") {
      form.status = "committee_approved";
      await form.save();
    } else if (action === "reject") {
      if (!reason) return res.status(400).json({ success: false, error: "Rejection reason is required" });

      form.status = "committee_rejected";
      form.rejectionReason = reason;
      await form.save();

      // Send email to student
      await sendEmail({
        to: form.student.email,
        subject: "Medical Form Rejected by Committee",
        text: `Hello ${form.student.name},\n\nYour medical form has been rejected by the committee.\nReason: ${reason}\n\nContact administration for details.`,
      });
    } else {
      return res.status(400).json({ success: false, error: "Invalid action" });
    }

    res.json({ success: true, message: `Form ${action}ed successfully`, form });
  } catch (error) {
    console.error("Error reviewing form:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
