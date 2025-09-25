const bcrypt = require("bcrypt");
const users = require("../models/users");
const MedicalForm = require("../models/MedicalForm");
const sendEmail = require("../utils/sendEmail");

// 🔹 Mentor Registration
const mentorRegistration = async (req, res) => {
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
    const newMentor = new users({
      name,
      email,
      password: hashedPassword,
      role: "mentor",
      contact_number,
    });

    await newMentor.save();
    res.status(201).json({
      message: "Mentor registered successfully",
      mentor: newMentor,
    });
  } catch (error) {
    console.error("Error in mentor registration[POST]:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔹 Get all medical forms (mentor view)
const getAllMedicalForms = async (req, res) => {
  try {
    console.log("Fetching medical forms...");

    const forms = await MedicalForm.find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    console.log("Fetched forms:", forms.length);

    res.json({ success: true, forms });
  } catch (error) {
    console.error("Error in getAllMedicalForms:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// 🔹 Review a medical form (approve/reject)
const reviewMedicalForm = async (req, res) => {
  try {
    const { action, reason } = req.body; // action = "approve" | "reject"
    const formId = req.params.id;

    const form = await MedicalForm.findById(formId).populate("student");
    if (!form) {
      return res.status(404).json({ success: false, error: "Form not found" });
    }

    if (action === "approve") {
      form.status = "mentor_approved";
      await form.save();

      return res.json({
        success: true,
        message: "Form approved and sent to doctor",
        form,
      });
    }

    if (action === "reject") {
      if (!reason) {
        return res
          .status(400)
          .json({ success: false, error: "Rejection reason is required" });
      }

      form.status = "mentor_rejected";
      form.rejectionReason = reason;
      await form.save();

      // Send rejection email
      await sendEmail({
        to: form.student.email,
        subject: "Medical Form Rejected by Mentor",
        text: `Hello ${form.student.name},\n\nYour medical form has been rejected.\nReason: ${reason}\n\nPlease contact your mentor if you need clarification.`,
      });

      return res.json({
        success: true,
        message: "Form rejected and student notified via email",
        form,
      });
    }

    return res.status(400).json({ success: false, error: "Invalid action" });
  } catch (error) {
    console.error("Error reviewing medical form:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// ✅ Export all together
module.exports = {
  mentorRegistration,
  getAllMedicalForms,
  reviewMedicalForm,
};
