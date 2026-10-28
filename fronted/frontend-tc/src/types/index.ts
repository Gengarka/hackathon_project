export interface Client {
  id: number;
  name: string;
  email: string;
}

export interface ClientHistoryEvent {
  event_id: number;
  shop_name: string;
  event_type: string;
  amount: number;
  event_date: string;
}

export interface CinemaRecommendation {
  id: number;
  full_name: string;
  phone: string;
}