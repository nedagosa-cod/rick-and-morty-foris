import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { LoginForm } from './features/auth/components/LoginForm/LoginForm';
import { Game } from './features/game/components/Game/Game';
import { ProtectedRoute } from './components/ui/ProtectedRoute/ProtectedRoute';
import './assets/styles/App.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<LoginForm />} />
          
          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/game" element={<Game />} />
          </Route>

          {/* Redirecciones por defecto */}
          <Route path="/" element={<Navigate to="/game" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
