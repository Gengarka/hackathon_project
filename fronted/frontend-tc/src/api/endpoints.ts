import { api } from './client';
import type { Client, ClientHistoryEvent, CinemaRecommendation } from '../types';

export async function getClients(): Promise<Client[]> {
  const { data } = await api.get<Client[]>('/api/clients');
  return data;
}

export async function getClientHistory(clientId: number): Promise<ClientHistoryEvent[]> {
  const { data } = await api.get<ClientHistoryEvent[]>(`/api/clients/${clientId}/history`);
  return data;
}

export async function getCinemaRecommendations(): Promise<CinemaRecommendation[]> {
  const { data } = await api.get<CinemaRecommendation[]>('/api/recommendations/cinema');
  return data;
}


export async function createClient(clientData: { full_name: string; email: string }): Promise<Client> {
  const { data } = await api.post<Client>('/api/clients', clientData);
  return data;
}

export async function deleteClient(clientId: number): Promise<void> {
  await api.delete(`/api/clients/${clientId}`);
}

export async function updateClient(clientId: number, clientData: { name: string; email: string }): Promise<void> {
  await api.put(`/api/clients/${clientId}`, clientData);
}