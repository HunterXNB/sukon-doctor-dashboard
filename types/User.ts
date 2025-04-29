export type UserProfile = {
  id: number;
  first_name: string;
  last_name: string | null;
  mobile: string;
  email: string;
  avatar: string;
  type: "Provider";
  date_of_birth: string;
  gender: "male" | "female";
  is_active: boolean;
  is_email_verified: boolean;
  has_completed_signup: boolean;
  registration_status: "pending" | "approved" | "rejected";
  title: string;
  nationality: string;
  country_of_residence: string;
  fluent_language: string;
  highest_degree: string;
  university: string;
  graduation_year: string;
  specialization: {
    id: number;
    name: string;
  }[];
  years_of_experience: string;
  licensing_area: string;
  licensing_number: string;
  work_on_clinic: 1 | 0;
  has_more_than_one_qualification: 1 | 0;
  clinic_address: string;
  qualifications: {
    id: number;
    url: string;
  }[];
  cv: string;
  role: {
    id: number;
    name: string;
    is_active: boolean;
  };
  permissions: [];
};
