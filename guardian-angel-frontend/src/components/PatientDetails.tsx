import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PatientDetails as IPatientDetails } from '../types';

interface PatientDetailsProps {
  patientId: number;
  onClose: () => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patientId, onClose }) => {
  const [patient, setPatient] = useState<IPatientDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patients/${patientId}/details`);
        setPatient(response.data);
      } catch (err) {
        setError('Failed to load patient details');
        console.error('Error fetching patient details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  if (loading) {
    return <div className="text-center py-4">Loading patient details...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold">
          {patient.first_name} {patient.last_name}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Personal Information</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Date of Birth:</span> {new Date(patient.dob).toLocaleDateString()}</p>
            <p><span className="font-medium">Gender:</span> {patient.gender}</p>
            <p><span className="font-medium">Phone:</span> {patient.phone}</p>
            <p><span className="font-medium">Address:</span> {patient.address}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Insurance Information</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Insurance:</span> {patient.insurance_name || 'Not specified'}</p>
            <p><span className="font-medium">Coverage Type:</span> {patient.coverage_type || 'Not specified'}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Provider Information</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Primary Provider:</span>{' '}
              {patient.provider_first_name && patient.provider_last_name
                ? `${patient.provider_first_name} ${patient.provider_last_name}`
                : 'Not assigned'}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Care Plan</h3>
          <div className="space-y-2">
            {patient.care_plan_start && patient.care_plan_end ? (
              <>
                <p>
                  <span className="font-medium">Start Date:</span>{' '}
                  {new Date(patient.care_plan_start).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">End Date:</span>{' '}
                  {new Date(patient.care_plan_end).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Authorized Hours/Week:</span>{' '}
                  {patient.authorized_hours_per_week}
                </p>
              </>
            ) : (
              <p>No active care plan</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
