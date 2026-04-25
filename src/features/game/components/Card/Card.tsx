import { useRef, useEffect } from 'react';
import type { Character } from '../../api/queries';
import './Card.css';

interface CardProps {
  character: Character;
  onClick?: () => void;
  isFlipped: boolean;
  isMatched?: boolean;
  index: number;
  disableDelay?: boolean;
}

export const Card = ({ character, onClick, isFlipped, isMatched, index, disableDelay }: CardProps) => {
  const hasShuffled = useRef(false);

  useEffect(() => {
    if (disableDelay) {
      hasShuffled.current = true;
    }
  }, [disableDelay]);

  // Solo aplica la animación de aparición si nunca se ha barajado
  const appearClass = !hasShuffled.current && !disableDelay ? 'card--appear' : '';

  return (
    <button
      className={`card ${appearClass} ${isFlipped ? 'card--flipped' : ''} ${isMatched ? 'card--matched' : ''}`}
      onClick={onClick}
      type="button"
      style={!hasShuffled.current && !disableDelay ? { animationDelay: `${index * 0.05}s` } : undefined}
    >
      <div className="card__inner">

        {/* Front of the card (Face UP) */}
        <div className="card__front">
          <figure className="card__image-container">
            <img
              src={character.image}
              alt={`Imagen de ${character.name}`}
              className="card__image"
              loading="lazy"
            />
          </figure>
          <div className="card__info">
            <h3 className="card__name">{character.name}</h3>
            <p className="card__details">
              {character.status} - {character.species}
            </p>
          </div>
        </div>

        {/* Back of the card (Face DOWN) */}
        <div className="card__back">
          <img
            src="/src/assets/images/rick-and-morty-portal.png"
            alt="Dorso de carta"
            className="card__back-logo"
            width="120"
            height="60"
            loading="lazy"
          />
        </div>

      </div>
    </button>
  );
};
