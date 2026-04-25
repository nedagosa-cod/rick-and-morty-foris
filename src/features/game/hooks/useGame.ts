import { useState, useEffect, useCallback } from 'react';
import type { Character } from '../api/queries';

export interface GameCharacter extends Character {
  uniqueId: string;
}

type GamePhase = 'preview' | 'playing';
type ShuffleState = 'idle' | 'hiding' | 'showing';

export const useGame = (characters: Character[] | undefined, refreshCharacters?: () => void) => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('preview');
  const [gameCards, setGameCards] = useState<GameCharacter[]>([]);
  const [shuffleState, setShuffleState] = useState<ShuffleState>('idle');
  
  // Game Logic States
  const [flippedCards, setFlippedCards] = useState<GameCharacter[]>([]);
  const [matchedIds, setMatchedIds] = useState<number[]>([]);
  const [turns, setTurns] = useState(0);

  // Inicializa las cartas agregando un uniqueId para estabilizar el DOM de React durante el barajado
  useEffect(() => {
    // Cuando los personajes cambian (ej. al hacer refreshCharacters), inicializamos las cartas
    if (characters && characters.length > 0) {
      const cardsWithId = characters.map((char, i) => ({
        ...char,
        uniqueId: `${char.id}-${i}`
      }));
      setGameCards(cardsWithId);
    }
  }, [characters]);

  const handlePlay = useCallback(() => {
    // 1. Empezamos la animación de ocultar/barajar
    setShuffleState('hiding');
    
    // 2. A los 1000ms (mitad de la animación, cuando no se ven), barajamos el array
    setTimeout(() => {
      setGameCards(prev => {
        const shuffled = [...prev];
        // Algoritmo Fisher-Yates
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      });
      
      // 3. Empiezan a aparecer en sus nuevas posiciones
      setShuffleState('showing');
      
    }, 1000);

    // 4. Exactamente 3 segundos DESPUÉS de que terminan de barajarse (1000ms hide + 1000ms show + 3000ms delay)
    setTimeout(() => {
      setGamePhase('playing');
      setShuffleState('idle'); // Reiniciamos el estado de barajar
    }, 5000);
  }, []);

  const handleCardClick = useCallback((card: GameCharacter) => {
    // Si no estamos jugando, o la carta ya está volteada, o ya tiene match, o hay 2 en proceso
    if (gamePhase !== 'playing') return;
    if (flippedCards.some(c => c.uniqueId === card.uniqueId)) return;
    if (matchedIds.includes(card.id)) return;
    if (flippedCards.length >= 2) return;

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setTurns(prev => prev + 1);

      if (newFlipped[0].id === newFlipped[1].id) {
        // MATCH: Esperar 1 segundo y luego marcarlas como completadas
        setTimeout(() => {
          setMatchedIds(prev => [...prev, card.id]);
          setFlippedCards([]);
        }, 1000);
      } else {
        // NO MATCH: Esperar 1 segundo y voltearlas de nuevo
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [gamePhase, flippedCards, matchedIds]);

  const resetGame = useCallback(() => {
    setGamePhase('preview');
    setShuffleState('idle');
    setFlippedCards([]);
    setMatchedIds([]);
    setTurns(0);
    // Vaciamos las cartas actuales para que el useEffect las reconstruya al recibir nuevos personajes
    setGameCards([]);
    if (refreshCharacters) {
      refreshCharacters();
    }
  }, [refreshCharacters]);

  const isGameOver = gameCards.length > 0 && matchedIds.length === gameCards.length / 2;

  return {
    gamePhase,
    gameCards,
    shuffleState,
    handlePlay,
    handleCardClick,
    flippedCards,
    matchedIds,
    turns,
    matches: matchedIds.length,
    isGameOver,
    resetGame
  };
};
