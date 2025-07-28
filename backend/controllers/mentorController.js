const bcrypt = require("bcrypt");

exports.mentorRegistration = async (req, res) => {
  try {
    const {name, email, password, contact_number} = req.body;

    if(!name || !email || !password || !contact_number){
      return res.status(400).json({message: "All fields are required"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newMentor = new users({
      name,
      email,
      password:hashedPassword,
      role: 'mentor',
      contact_number
    });

    await newMentor.save();
    res.status(201).json({message: "Mentor registered successfully", mentor: newMentor});
  } catch (error) {
    console.log("Error in mentor registration[POST]:", error);
    res.status(500).json({message:"Internal Server Error"});
  }
}