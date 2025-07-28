const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const mentorRoutes = require('./routes/mentor');
const doctorRoutes = require('./routes/doctor');
const committeeRoutes = require('./routes/committee');
const dbTestRoutes = require('./routes/testRoutes');
const student = require('./routes/student');
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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/committee', committeeRoutes);
app.use('/api/db-test', dbTestRoutes);
app.use('/api/admin', student);
app.use('/api/admin',mentorRoutes )
app.use('/api/admin', doctorRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

