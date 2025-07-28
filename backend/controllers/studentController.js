const users = require("../models/users");
const bcrypt = require('bcrypt');

exports.studentRegistration = async (req, res) => {
  try {
    const {name, email, password, registration_number, year, level, degree, contact_number} = req.body;

    if(!name || !email || !password || !registration_number || !year || !level || !degree || !contact_number){
      return res.status(400).json({message: "All fields are required"});
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);
    const newUser = new users({
      name,
      email,
      password:hashedPassword,
      role: 'student',
      registration_number,
      year,
      level,
      degree,
      contact_number
    });

    await newUser.save();
    res.status(201).json({message: "Student registered successfully", user: newUser});
  } catch (error) {
    console.log("Error in student registration[POST]:",error);
    res.status(500).json({message:"Internal Server Error"});
  }
};