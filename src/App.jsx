import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { LS, AUTH_KEY, FONT, GLASS, GLASS_BORDER, TEXT } from './styles/tokens.js';
import Decoy from './pages/Decoy.jsx';
import InsideBlank from './pages/InsideBlank.jsx';
import Timetable from './pages/Timetable.jsx';

function RequireAuth({ children }) {
  return LS.get(AUTH_KEY) ? children : <Navigate to="/" replace />;
}

function SidebarLayout({ children }) {
  const location = useLocation();
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f1a' }}>
      <aside style={{ width: 220, borderRight: GLASS_BORDER, background: GLASS, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px 16px', borderBottom: GLASS_BORDER }}>
          <h1 style={{ color: '#fff', margin: 0, fontSize: 18, fontFamily: FONT }}>Hyang Project</h1>
        </div>
        <nav style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link to="/dashboard" style={{
            padding: '12px 16px', textDecoration: 'none', borderRadius: 8,
            color: location.pathname === '/dashboard' ? '#fff' : TEXT,
            background: location.pathname === '/dashboard' ? 'rgba(255,255,255,0.1)' : 'transparent',
            fontFamily: FONT
          }}>
            Hyang
          </Link>
          <Link to="/timetable" style={{
            padding: '12px 16px', textDecoration: 'none', borderRadius: 8,
            color: location.pathname === '/timetable' ? '#fff' : TEXT,
            background: location.pathname === '/timetable' ? 'rgba(255,255,255,0.1)' : 'transparent',
            fontFamily: FONT
          }}>
            Calendar
          </Link>
        </nav>
      </aside>
      <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Decoy />} />
      <Route path="/dashboard" element={<RequireAuth><SidebarLayout><InsideBlank /></SidebarLayout></RequireAuth>} />
      <Route path="/timetable" element={<RequireAuth><SidebarLayout><Timetable /></SidebarLayout></RequireAuth>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
