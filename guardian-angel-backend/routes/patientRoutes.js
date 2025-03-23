const express = require('express');
const router = express.Router();
const { 
  getAllPatients, 
  getPatientById,
  getPatientDetails,
  createPatient, 
  updatePatient, 
  deletePatient 
} = require('../controllers/patientController');

// Get all patients
router.get('/', getAllPatients);

// Get patient by ID
router.get('/:id', getPatientById);

// Get patient details including related data
router.get('/:id/details', getPatientDetails);

// Create new patient
router.post('/', createPatient);

// Update patient
router.put('/:id', updatePatient);

// Delete patient
router.delete('/:id', deletePatient);

module.exports = router;
