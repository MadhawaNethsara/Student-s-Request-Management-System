const pool = require('../config/db');

exports.submitApplication = async (req, res) => {
  const { exam_id, medical_note } = req.body;
  const student_id = req.user.id;

  try {
    const [result] = await pool.query(
      'INSERT INTO medical_applications (student_id, exam_id, medical_note, status) VALUES (?, ?, ?, ?)',
      [student_id, exam_id, medical_note, 'pending']
    );
    res.status(201).json({ message: 'Application submitted', app_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyApplications = async (req, res) => {
  const student_id = req.user.id;
  try {
    const [applications] = await pool.query(
      'SELECT * FROM medical_applications WHERE student_id = ?',
      [student_id]
    );
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};