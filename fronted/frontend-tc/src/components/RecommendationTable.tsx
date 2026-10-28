import type { CinemaRecommendation } from '../types';

interface Props {
  rows: CinemaRecommendation[];
}

export function RecommendationTable({ rows }: Props) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
      <thead>
        <tr style={{ background: '#fafafa', textAlign: 'left' }}>
          <th style={cellStyle}>ID</th>
          <th style={cellStyle}>ФИО</th>
          <th style={cellStyle}>Телефон</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id} style={{ borderTop: '1px solid #eee' }}>
            <td style={cellStyle}>{r.id}</td>
            <td style={cellStyle}>{r.full_name}</td>
            <td style={cellStyle}>{r.phone}</td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr>
            <td colSpan={3} style={{ ...cellStyle, textAlign: 'center', color: '#999' }}>
              Нет рекомендаций
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