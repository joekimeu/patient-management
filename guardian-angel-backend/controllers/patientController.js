const Patient = require('../models/patientModel');

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.getAllPatients();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.getPatientById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPatientDetails = async (req, res) => {
  try {
    const patient = await Patient.getPatientWithDetails(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPatient = async (req, res) => {
  try {
    const newPatient = await Patient.createPatient(req.body);
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.updatePatient(req.params.id, req.body);
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(updatedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.deletePatient(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { 
  getAllPatients, 
  getPatientById,
  getPatientDetails,
  createPatient, 
  updatePatient, 
  deletePatient 
};
