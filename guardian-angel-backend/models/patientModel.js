const pool = require('../config/db');

const getAllPatients = async () => {
  const res = await pool.query('SELECT * FROM patients');
  return res.rows;
};

const getPatientById = async (id) => {
  const res = await pool.query('SELECT * FROM patients WHERE patient_id = $1', [id]);
  return res.rows[0];
};

const createPatient = async (patient) => {
  const { first_name, last_name, dob, gender, phone, address, insurance_id, primary_provider_id } = patient;
  const res = await pool.query(
    'INSERT INTO patients (first_name, last_name, dob, gender, phone, address, insurance_id, primary_provider_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [first_name, last_name, dob, gender, phone, address, insurance_id, primary_provider_id]
  );
  return res.rows[0];
};

const updatePatient = async (id, patient) => {
  const { first_name, last_name, dob, gender, phone, address, insurance_id, primary_provider_id } = patient;
  const res = await pool.query(
    `UPDATE patients 
     SET first_name = $1, last_name = $2, dob = $3, gender = $4, 
         phone = $5, address = $6, insurance_id = $7, primary_provider_id = $8
     WHERE patient_id = $9 RETURNING *`,
    [first_name, last_name, dob, gender, phone, address, insurance_id, primary_provider_id, id]
  );
  return res.rows[0];
};

const deletePatient = async (id) => {
  const res = await pool.query('DELETE FROM patients WHERE patient_id = $1 RETURNING *', [id]);
  return res.rows[0];
};

const getPatientWithDetails = async (id) => {
  const res = await pool.query(
    `SELECT 
      p.*,
      i.name as insurance_name,
      i.coverage_type,
      e.first_name as provider_first_name,
      e.last_name as provider_last_name,
      cp.start_date as care_plan_start,
      cp.end_date as care_plan_end,
      cp.authorized_hours_per_week
     FROM patients p
     LEFT JOIN insurance i ON p.insurance_id = i.insurance_id
     LEFT JOIN employees e ON p.primary_provider_id = e.employee_id
     LEFT JOIN care_plans cp ON p.care_plan_id = cp.care_plan_id
     WHERE p.patient_id = $1`,
    [id]
  );
  return res.rows[0];
};

module.exports = { 
  getAllPatients, 
  getPatientById, 
  createPatient, 
  updatePatient, 
  deletePatient,
  getPatientWithDetails
};
