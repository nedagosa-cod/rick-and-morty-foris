import { useAuthStore } from '../../../auth/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/ui/Button/Button';
import { useCharacters } from '../../hooks/useCharacters';
import { useGame } from '../../hooks/useGame';
import { Card } from '../Card/Card';
import './Game.css';
import logo from '../../../../assets/images/Rick_and_Morty.png';

export const Game = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { data: characters, isLoading, isError, refresh } = useCharacters();

  // Extraemos toda la lógica de estado y de negocio al Custom Hook
  const {
    gamePhase,
    gameCards,
    shuffleState,
    handlePlay,
    handleCardClick,
    flippedCards,
    matchedIds,
    turns,
    matches,
    isGameOver,
    resetGame
  } = useGame(characters, refresh);

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="game">
      <header className="game__header">
        <figure className="game__logo-container">
          <img
            src={logo}
            alt="Rick and Morty Logo"
            className="game__logo"
            width="800"
            height="400"
          />
        </figure>
        <div className="game__badge">Juego de memoria</div>

        {/* Temporary logout button for convenience */}
        <button className="game__logout" onClick={logout} aria-label="Cerrar sesión">
          Cerrar sesión
        </button>
      </header>

      <main className="game__board-container">
        <div className="game__board">
          {isGameOver ? (
            <div className="game__success">
              <h2 className="game__success-title">¡Felicitaciones!</h2>
              <p className="game__success-text">Terminaste el juego con {turns} turnos</p>
              <div className="game__success-actions">
                <Button variant="primary" size="md" onClick={resetGame}>Repetir</Button>
                <Button variant="secondary" size="md" onClick={handleHome}>Inicio</Button>
              </div>
            </div>
          ) : (
            <>
              {gamePhase === 'preview' ? (
                <h2 className="game__board-title" style={{ fontFamily: 'var(--font-main)', fontSize: 'var(--text-title)', fontWeight: 700, margin: 0, color: 'var(--color-text-main)' }}>Personajes</h2>
              ) : (
                <header className="game__score-board">
                  <h2 className="game__score">Aciertos: {matches}</h2>
                  <h2 className="game__score">Turnos: {turns}</h2>
                </header>
              )}

              {isLoading && <p className="game__message">Cargando personajes...</p>}
              {isError && <p className="game__message">Error al cargar los personajes.</p>}

              {!isLoading && !isError && gameCards.length > 0 && (
                <div className={`game__grid ${shuffleState === 'hiding' ? 'game__grid--hiding' : ''} ${shuffleState === 'showing' ? 'game__grid--showing' : ''}`}>
                  {gameCards.map((card, index) => (
                    <Card
                      key={card.uniqueId}
                      character={card}
                      isFlipped={gamePhase === 'playing' && !flippedCards.some(c => c.uniqueId === card.uniqueId) && !matchedIds.includes(card.id)}
                      isMatched={matchedIds.includes(card.id)}
                      onClick={() => handleCardClick(card)}
                      index={index}
                      disableDelay={shuffleState !== 'idle'}
                    />
                  ))}
                </div>
              )}

              {gamePhase === 'preview' && (
                <div className="game__actions">
                  <Button variant="primary" size="md" onClick={handlePlay} disabled={shuffleState !== 'idle' || isLoading}>
                    {shuffleState !== 'idle' ? 'Barajando...' : 'Jugar'}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};
