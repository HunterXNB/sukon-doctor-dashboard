export type Patient = {
  id: number;
  name: string;
  last_active_at: string;
  next_appointment: {
    id: number;
    date: string;
    start_time: string;
  };
  status: string;
  summary: string | null;
  image?: string;
};
