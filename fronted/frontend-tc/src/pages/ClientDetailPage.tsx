import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getClientHistory, getClients } from '../api/endpoints';
import { EventsTimeline } from '../components/EventsTimeline';
import type { Client, ClientHistoryEvent } from '../types';

export function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const clientId = Number(id);

  const [client, setClient] = useState<Client | null>(
    (location.state as { client?: Client })?.client ?? null
  );
  const [events, setEvents] = useState<ClientHistoryEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!client) {
      getClients().then((list) => {
        const found = list.find((c) => c.id === clientId) ?? null;
        setClient(found);
      });
    }
    getClientHistory(clientId)
      .then(setEvents)
      .finally(() => setLoading(false));
  }, [clientId]);

  return (
    <div>
      <Link to="/">← Назад к списку</Link>
      <h1 style={{ marginTop: 12 }}>
        {client ? client.name : `Клиент #${clientId}`}
      </h1>
      {client?.email && (
        <p style={{ color: '#666', marginTop: -8 }}>{client.email}</p>
      )}

      <h2 style={{ marginTop: 24 }}>Лента событий</h2>
      {loading ? <p>Загрузка…</p> : <EventsTimeline events={events} />}
    </div>
  );
}