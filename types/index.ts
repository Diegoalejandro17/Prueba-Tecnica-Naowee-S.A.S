export interface user {
    id: number;
    username: string;
    email: string;
    role?: string;
}

export interface LoginCredentials {
    username: string; 
    password: string; 
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export interface Field {
  id: number;
  name: string;
  location: string;
  capacity: number;
  price_per_hour: number;
  description?: string;
}

export interface AvailabilitySlot {
  start_time: string;
  end_time: string;
  available: boolean;
}

export interface Reservation {
  id: number;
  field_id: number;
  field_name?: string;
  user_id: number;
  date: string;
  start_time: string;
  end_time: string;
  duration_hours: number;
  total_price: number;
  status: 'active' | 'cancelled';
  created_at: string;
}

export interface CreateReservationPayload {
  field_id: number;
  date: string;
  start_time: string;
  duration_hours: 1 | 2;
}

export interface DashboardStats {
  total_users: number;
  total_fields: number;
  total_reservations: number;
  total_revenue: number;
  active_reservations: number;
  cancelled_reservations: number;
}