import { Link } from 'react-router-dom';
import type { Client } from '../types';

interface Props {
  clients: Client[];
  onDelete: (id: number) => void; 
}

export function ClientsTable({ clients, onDelete }: Props) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
      <thead>
        <tr style={{ background: '#fafafa', textAlign: 'left' }}>
          <th style={cellStyle}>ID</th>
          <th style={cellStyle}>Имя</th>
          <th style={cellStyle}>Email</th>
          <th style={cellStyle}>Действия</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((c) => (
          <tr key={c.id} style={{ borderTop: '1px solid #eee' }}>
            <td style={cellStyle}>{c.id}</td>
            <td style={cellStyle}>{c.name}</td>
            <td style={cellStyle}>{c.email}</td>
            <td style={cellStyle}>
              <Link to={`/clients/${c.id}`} state={{ client: c }} style={{ marginRight: '15px' }}>
                История →
              </Link>
              
              <button 
                onClick={() => onDelete(c.id)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'red', 
                  cursor: 'pointer',
                  padding: 0,
                  font: 'inherit'
                }}
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
        {clients.length === 0 && (
          <tr>
            <td colSpan={4} style={{ ...cellStyle, textAlign: 'center', color: '#999' }}>
              Нет данных
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

const cellStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderBottom: '1px solid #eee',
};