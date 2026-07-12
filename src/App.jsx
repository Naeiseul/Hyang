import { Routes, Route, Navigate } from 'react-router-dom';
import { LS, AUTH_KEY } from './styles/tokens.js';
import Decoy from './pages/Decoy.jsx';
import InsideBlank from './pages/InsideBlank.jsx';

function RequireAuth({ children }) {
  return LS.get(AUTH_KEY) ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Decoy />} />
      <Route path="/dashboard" element={<RequireAuth><InsideBlank /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
