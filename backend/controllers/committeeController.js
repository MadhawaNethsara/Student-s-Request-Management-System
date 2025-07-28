const pool = require('../config/db');

exports.getAllApplications = async (req, res) => {
  try {
    const [applications] = await pool.query('SELECT * FROM medical_applications');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.finalDecision = async (req, res) => {
  const application_id = req.params.id;
  const { decision } = req.body;

  try {
    await pool.query(
      'UPDATE medical_applications SET status = ?, committee_decision_time = NOW() WHERE id = ?',
      [decision, application_id]
    );
    res.json({ message: 'Final decision saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
