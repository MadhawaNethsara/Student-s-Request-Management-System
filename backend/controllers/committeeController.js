const bcrypt = require("bcrypt");
const users = require("../models/users");

exports.committeeRegistration = async (req, res)=> {
  try{
    const {name, email, password, contact_number} = req.body;

    if(!name || !email || !password || !contact_number){
      return res.status(400).json({message: "All fields are required"});
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCommittee = new users({
      name,
      email,
      password: hashedPassword,
      role: 'committee',
      contact_number
    });

    await newCommittee.save();

    res.status(201).json({message: "Committee member registered successfully", Committee: newCommittee});
    
  } catch (error) {
    console.log("Error in Committee registration[POST]:", error);
    res.status(500).json({message: "Internal Server Error"});
  }
}