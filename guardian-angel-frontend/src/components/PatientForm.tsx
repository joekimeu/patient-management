import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Patient, PatientFormData } from '../types';

interface PatientFormProps {
  patient?: Patient;
  onSubmit: () => void;
  onCancel: () => void;
}

const initialFormData: PatientFormData = {
  first_name: '',
  last_name: '',
  dob: '',
  gender: '',
  phone: '',
  address: '',
  insurance_id: undefined,
  primary_provider_id: undefined,
};

const PatientForm: React.FC<PatientFormProps> = ({ patient, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<PatientFormData>(initialFormData);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (patient) {
      setFormData({
        first_name: patient.first_name,
        last_name: patient.last_name,
        dob: patient.dob,
        gender: patient.gender,
        phone: patient.phone,
        address: patient.address,
        insurance_id: patient.insurance_id,
        primary_provider_id: patient.primary_provider_id,
      });
    }
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (patient) {
        await axios.put(`http://localhost:5000/api/patients/${patient.patient_id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/patients', formData);
      }
      onSubmit();
    } catch (err) {
      setError('Failed to save patient data');
      console.error('Error saving patient:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">
        {patient ? 'Edit Patient' : 'Add New Patient'}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {patient ? 'Update' : 'Create'} Patient
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
