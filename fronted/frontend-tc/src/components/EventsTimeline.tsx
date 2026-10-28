import type { ClientHistoryEvent } from '../types';

interface Props {
  events: ClientHistoryEvent[];
}

export function EventsTimeline({ events }: Props) {
  if (events.length === 0) {
    return <p style={{ color: '#999' }}>У клиента пока нет событий.</p>;
  }

  return (
    <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {events.map((e) => (
        <li
          key={e.event_id}
          style={{
            background: '#fff',
            borderLeft: '4px solid #1677ff',
            padding: '12px 16px',
            marginBottom: 8,
            borderRadius: 4,
          }}
        >
          <div style={{ fontWeight: 600 }}>{e.shop_name}</div>
          <div style={{ color: '#666', fontSize: 14 }}>
            {e.event_type} · {e.amount} ₽ · {e.event_date}
          </div>
        </li>
      ))}
    </ol>
  );
}