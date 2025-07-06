export interface Doctor {
  first_name: string;
  last_name: string;
  avatar: string;
  years_of_experience: string;
  title: string;
  bio: string | null;
  average_rating: number;
  specializations: Array<{
    id: number;
    name: string;
  }>;
  session_usd_price: string | null;
  session_egp_price: string;
  available_slots_count: number;
  role: string;
}

export interface PatientUser {
  id: number;
  first_name: string;
  last_name: string | null;
  mobile: string;
  email: string;
  avatar: string;
  type: string;
  date_of_birth: string | null;
  gender: string | null;
  is_active: boolean;
  is_email_verified: boolean;
  has_completed_signup: boolean;
}

export interface Patient {
  user: PatientUser;
}

export interface PendingAppointment {
  id: number;
  date: string;
  start_time: string;
  duration: number;
  status: "pending";
  complaint: string;
  doctor: Doctor;
  patient: Patient;
  rate: number | null;
}
