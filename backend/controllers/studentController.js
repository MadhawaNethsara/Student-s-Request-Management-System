const bcrypt = require("bcrypt");
const User = require("../models/users");
const MedicalForm = require("../models/MedicalForm");
const LeaveForm = require("../models/LeaveForm");

// Register a new student
exports.studentRegistration = async (req, res) => {
  try {
    const {
      name,
      registration_number,
      email,
      password,
      contact_number,
      degree,
      level,
      semester,
    } = req.body;

    if (
      !name ||
      !registration_number ||
      !email ||
      !password ||
      !contact_number ||
      !degree ||
      !level ||
      !semester
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new User({
      name,
      registration_number,
      email,
      password: hashedPassword,
      role: "student",
      contact_number,
      degree,
      level,
      semester,
    });

    await newStudent.save();

    res
      .status(201)
      .json({
        message: "Student registered successfully",
        student: newStudent,
      });
  } catch (error) {
    console.error("Error in student registration[POST]:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students[GET]:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select("-password");
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student[GET]:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get logged-in student data (for dashboard / pre-fill form)
exports.getLoggedInStudent = async (req, res) => {
  try {
    const student = await User.findById(req.user._id).select("-password");
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching logged-in student[GET]:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent || updatedStudent.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }
    res
      .status(200)
      .json({
        message: "Student updated successfully",
        student: updatedStudent,
      });
  } catch (error) {
    console.error("Error updating student[PUT]:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await User.findByIdAndDelete(req.params.id);
    if (!deletedStudent || deletedStudent.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }
    res
      .status(200)
      .json({
        message: "Student deleted successfully",
        student: deletedStudent,
      });
  } catch (error) {
    console.error("Error deleting student[DELETE]:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Submit medical form (prefilled from logged-in student)
exports.submitMedicalForm = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Medical slip is required" });
    }

    const studentData = req.user;

    // Parse subjects safely
    let subjects = [];
    if (req.body.subjects) {
      subjects = JSON.parse(req.body.subjects);
    }

    const medicalform = new MedicalForm({
      student: studentData._id,
      fullName: studentData.name,
      regNumber: studentData.registration_number,
      year: studentData.level,
      level: studentData.level,
      semester: studentData.semester,
      degree: studentData.degree,
      contactNumber: studentData.contact_number,
      subject: subjects,
      medicalSlip: req.file.path,
    });

    await medicalform.save();

    res
      .status(201)
      .json({ message: "Medical form submitted successfully", medicalform });
  } catch (error) {
    console.error("Error submitting medical form:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.submitLeave = async (req, res) => {
  try {
    const leave = new LeaveForm({
      student: req.user._id,
      ...req.body,
      proofDoc: req.file?.path || "", // if file uploaded
    });
    await leave.save();
    res.status(201).json({ success: true, leave });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
