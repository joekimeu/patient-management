export interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  phone: string;
  address: string;
  insurance_id?: number;
  primary_provider_id?: number;
  care_plan_id?: number;
}

export interface PatientDetails extends Patient {
  insurance_name?: string;
  coverage_type?: string;
  provider_first_name?: string;
  provider_last_name?: string;
  care_plan_start?: string;
  care_plan_end?: string;
  authorized_hours_per_week?: number;
}

export interface PatientFormData {
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  phone: string;
  address: string;
  insurance_id?: number;
  primary_provider_id?: number;
}
