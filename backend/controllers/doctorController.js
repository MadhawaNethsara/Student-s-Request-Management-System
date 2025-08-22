const bcrypt = require("bcrypt");
const users = require("../models/users");

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
    res
      .status(201)
      .json({ message: "Doctor registered successfully", Doctor: newDoctor });
  } catch (error) {
    console.log("Error in Doctor registration[POST]:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
