const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const mentorRoutes = require('./routes/mentor');
const doctorRoutes = require('./routes/doctor');
const committeeRoutes = require('./routes/committee');
const dbTestRoutes = require('./routes/testRoutes');
const timetableRoutes = require('./routes/timetable');
//const studentRoutes = require('./routes/student');

const medicalFormRoutes = require('./routes/medicalForm');

const connectDB = require('./config/db');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

connectDB();

// Optional: health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/student', studentRoutes);
// app.use('/api/db-test', dbTestRoutes);
// app.use('/api/admin', student);
// app.use('/api', student);
// app.use('/api/admin',mentorRoutes );
// //app.use('/api/mentor',mentorRoutes );
// app.use('/api/admin', doctorRoutes);
// //app.use('/api/doctor', doctorRoutes);
// app.use('/api/admin', committeeRoutes);
// app.use('/api/timetable', timetableRoutes); 

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes); 
app.use("/api/mentor", mentorRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/committee", committeeRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/db-test", dbTestRoutes);
app.use("/api/medicalform", medicalFormRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

