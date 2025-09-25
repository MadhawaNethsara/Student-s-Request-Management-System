const bcrypt = require("bcrypt");
const users = require("../models/users");
const MedicalForm = require("../models/MedicalForm");
const sendEmail = require("../utils/sendEmail");

// 🔹 Doctor Registration
exports.doctorRegistration = async (req, res) => {
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
    const newDoctor = new users({
      name,
      email,
      password: hashedPassword,
      role: "doctor",
      contact_number,
    });

    await newDoctor.save();

    // Send welcome email
    try {
      await sendEmail({
        to: email,
        subject: "Welcome to Exam Medical System",
        text: `Hello ${name},\n\nYou have been successfully registered as a doctor in the Exam Medical System.\n\nPlease login with your credentials.\n\nThank you!`,
      });
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError);
    }

    res.status(201).json({
      message: "Doctor registered successfully",
      doctor: {
        id: newDoctor._id,
        name: newDoctor.name,
        email: newDoctor.email,
        contact_number: newDoctor.contact_number,
        role: newDoctor.role,
      },
    });
  } catch (error) {
    console.error("Error in Doctor registration[POST]:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔹 Get all medical forms (doctor view - no subjects)
exports.getAllMedicalFormsDoctor = async (req, res) => {
  try {
    const forms = await MedicalForm.find()
      .populate("student", "name email regNumber")
      .sort({ createdAt: -1 });

    // Map to only send necessary data
    const simplifiedForms = forms.map((form) => ({
      _id: form._id,
      fullName: form.student?.name || "N/A",
      regNumber: form.student?.regNumber || "N/A",
      email: form.student?.email || "",
      medicalSlip: form.medicalSlip || "",
      status: form.status,
      rejectionReason: form.rejectionReason || "",
    }));

    res.json({ success: true, forms: simplifiedForms });
  } catch (error) {
    console.error("Error fetching forms for doctor:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// 🔹 Review a medical form (approve/reject)
exports.reviewMedicalFormDoctor = async (req, res) => {
  try {
    const { action, reason } = req.body; // action = "approve" | "reject"
    const formId = req.params.id;

    const form = await MedicalForm.findById(formId).populate("student");
    if (!form) return res.status(404).json({ success: false, error: "Form not found" });

    if (action === "approve") {
      form.status = "doctor_approved";
      await form.save();
      return res.json({ success: true, message: "Form approved by doctor", form });
    }

    if (action === "reject") {
      if (!reason) return res.status(400).json({ success: false, error: "Rejection reason required" });

      form.status = "doctor_rejected";
      form.rejectionReason = reason;
      await form.save();

      // Send rejection email
      try {
        await sendEmail({
          to: form.student.email,
          subject: "Medical Form Rejected by Doctor",
          text: `Hello ${form.student.name},\n\nYour medical form has been rejected by the doctor.\nReason: ${reason}\n\nPlease contact your doctor if you need clarification.`,
        });
      } catch (emailError) {
        console.error("Error sending rejection email:", emailError);
      }

      return res.json({ success: true, message: "Form rejected and student notified via email", form });
    }

    return res.status(400).json({ success: false, error: "Invalid action" });
  } catch (error) {
    console.error("Error reviewing form by doctor:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
