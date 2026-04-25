import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '../../../lib/graphql-client';
import { GET_CHARACTERS, type CharactersResponse, type Character } from '../api/queries';

export const useCharacters = () => {
  // La API de Rick and Morty tiene 42 páginas de personajes. Elegimos una al azar.
  const [randomPage, setRandomPage] = useState(() => Math.floor(Math.random() * 42) + 1);

  const query = useQuery({
    queryKey: ['characters', randomPage],
    queryFn: async (): Promise<Character[]> => {
      const data = await graphqlClient.request<CharactersResponse>(GET_CHARACTERS, { page: randomPage });
      
      // Tomamos los 20 personajes de la página y los barajamos (Fisher-Yates) para no sacar siempre los primeros 6
      const allCharacters = [...data.characters.results];
      for (let i = allCharacters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allCharacters[i], allCharacters[j]] = [allCharacters[j], allCharacters[i]];
      }

      // Tomamos 6 personajes completamente al azar de esta página
      const selectedCharacters = allCharacters.slice(0, 6);
      
      // Creamos los pares de forma secuencial (A, A, B, B...) para la vista previa
      const pairedCharacters: Character[] = [];
      selectedCharacters.forEach((char) => {
        pairedCharacters.push(char, char);
      });
      
      // Devolvemos las cartas ordenadas. El shuffle se hará en el componente Game al hacer clic en Jugar.
      return pairedCharacters;
    },
    staleTime: Infinity, // No necesitamos refetch constante para el juego
  });

  const refresh = () => setRandomPage(Math.floor(Math.random() * 42) + 1);

  return { ...query, refresh };
};
