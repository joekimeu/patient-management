import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Patient } from '../types';
import PatientForm from './PatientForm';
import PatientDetails from './PatientDetails';

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(undefined);
  const [showDetails, setShowDetails] = useState(false);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients');
      setPatients(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load patients');
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (patientId: number) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/patients/${patientId}`);
      setPatients(patients.filter(p => p.patient_id !== patientId));
    } catch (err) {
      setError('Failed to delete patient');
      console.error('Error deleting patient:', err);
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setSelectedPatient(undefined);
    fetchPatients();
  };

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
  };

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowDetails(true);
  };

  if (loading) {
    return <div className="text-center py-4">Loading patients...</div>;
  }

  if (showForm) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <PatientForm
          patient={selectedPatient}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setSelectedPatient(undefined);
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patients</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Patient
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date of Birth
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.patient_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.first_name} {patient.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(patient.dob).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewDetails(patient)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(patient)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(patient.patient_id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetails && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <PatientDetails
              patientId={selectedPatient.patient_id}
              onClose={() => {
                setShowDetails(false);
                setSelectedPatient(undefined);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;
