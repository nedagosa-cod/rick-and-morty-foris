import { useAuth } from '../../../auth/context/AuthContext';
import { Button } from '../../../../components/ui/Button/Button';
import './Game.css';

export const Game = () => {
  const { user, logout } = useAuth();

  return (
    <div className="game">
      <header className="game__header">
        <h2>Bienvenido, {user?.username}</h2>
        <Button variant="secondary" onClick={logout}>
          Cerrar Sesión
        </Button>
      </header>
      <main className="game__board">
        <p>El tablero del juego irá aquí.</p>
      </main>
    </div>
  );
};
