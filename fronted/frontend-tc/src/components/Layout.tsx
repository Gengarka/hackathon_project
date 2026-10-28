import { Link, Outlet, useLocation } from 'react-router-dom';

export function Layout() {
  const location = useLocation();

  const linkStyle = (path: string) => ({
    padding: '8px 16px',
    borderRadius: 6,
    textDecoration: 'none',
    color: location.pathname === path ? '#fff' : '#333',
    background: location.pathname === path ? '#1677ff' : 'transparent',
  });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#f5f5f5' }}>
      <header
        style={{
          display: 'flex',
          gap: 8,
          padding: '12px 24px',
          background: '#fff',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <strong style={{ marginRight: 24, alignSelf: 'center' }}>
          ТЦ · Единый профиль клиента
        </strong>
        <Link to="/" style={linkStyle('/')}>Клиенты</Link>
        <Link to="/recommendations" style={linkStyle('/recommendations')}>Рекомендации</Link>
      </header>
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}