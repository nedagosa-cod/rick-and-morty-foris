import { gql } from 'graphql-request';

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface CharactersResponse {
  characters: {
    results: Character[];
  };
}

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`;
