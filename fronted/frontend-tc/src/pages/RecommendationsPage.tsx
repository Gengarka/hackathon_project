import { useEffect, useState } from 'react';
import { getCinemaRecommendations } from '../api/endpoints';
import { RecommendationTable } from '../components/RecommendationTable';
import type { CinemaRecommendation } from '../types';

export function RecommendationsPage() {
  const [rows, setRows] = useState<CinemaRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCinemaRecommendations()
      .then(setRows)
      .finally(() => setLoading(false));
  }, []);

  const exportToCSV = () => {
    const BOM = '\uFEFF'; 
    const header = ['ID', 'ФИО', 'Телефон'];
    const csv =
      BOM +
      [
        header.join(';'),
        ...rows.map((r) => [r.id, r.full_name, r.phone].join(';')),
      ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'recommendations.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Рекомендации «Кого пригласить в кино»</h1>
      <p style={{ color: '#666' }}>
        Клиенты, которые уже были в Спортмастере и Кофейне, но ещё ни разу не заходили
        в Кинотеатр. Готовый сегмент для рассылки.
      </p>

      <div style={{ marginBottom: 12 }}>
        <button
          onClick={exportToCSV}
          disabled={rows.length === 0}
          style={{
            padding: '8px 16px',
            background: '#1677ff',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          Выгрузить для маркетинга (CSV)
        </button>
      </div>

      {loading ? <p>Загрузка…</p> : <RecommendationTable rows={rows} />}
    </div>
  );
}