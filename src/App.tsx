import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import { LoginForm } from './features/auth/components/LoginForm/LoginForm';
import { Game } from './features/game/components/Game/Game';
import { ProtectedRoute } from './components/ui/ProtectedRoute/ProtectedRoute';
import './assets/styles/App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<LoginForm />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/game" element={<Game />} />
          </Route>

          <Route path="*" element={<Navigate to="/game" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
