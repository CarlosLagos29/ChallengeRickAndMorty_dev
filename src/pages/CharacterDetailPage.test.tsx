import type { MockLink } from '@apollo/client/testing';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GET_CHARACTER } from '../graphql/queries';
import type { Character } from '../types/character';
import { renderApp } from '../test/utils';

const rick: Character = {
  id: '1',
  name: 'Rick Sanchez',
  image: 'https://example.com/1.jpeg',
  status: 'Alive',
  gender: 'Male',
  species: 'Human',
  type: '',
  origin: { name: 'Earth (C-137)' },
  location: { name: 'Citadel of Ricks' },
  episode: [
    { id: '1', name: 'Pilot' },
    { id: '51', name: 'Rickmurai Jack' },
  ],
};

const withTypenames = (character: Character) => ({
  __typename: 'Character',
  ...character,
  origin: character.origin && { __typename: 'Location', ...character.origin },
  location: character.location && { __typename: 'Location', ...character.location },
  episode: character.episode.map((episode) => ({ __typename: 'Episode', ...episode })),
});

const characterMock = (id: string, character: Character | null): MockLink.MockedResponse => ({
  request: { query: GET_CHARACTER, variables: { id } },
  result: { data: { character: character && withTypenames(character) } },
});

describe('CharacterDetailPage', () => {
  it('shows the character details', async () => {
    renderApp({ route: '/detail/1', mocks: [characterMock('1', rick)] });

    expect(await screen.findByRole('heading', { name: 'Name: Rick Sanchez' })).toBeInTheDocument();
    expect(screen.getByText('Status: Alive')).toBeInTheDocument();
    expect(screen.getByText('Origin: Earth (C-137)')).toBeInTheDocument();
    expect(screen.getByText('First episode: n° 1 "Pilot"')).toBeInTheDocument();
    expect(screen.getByText('Last episode: n° 51 "Rickmurai Jack"')).toBeInTheDocument();
    expect(screen.queryByText(/Subspecies/)).not.toBeInTheDocument();
  });

  it('shows the subspecies when the character has one', async () => {
    const birdperson = { ...rick, id: '47', name: 'Birdperson', type: 'Bird-Person' };
    renderApp({ route: '/detail/47', mocks: [characterMock('47', birdperson)] });

    expect(await screen.findByText('Subspecies: Bird-Person')).toBeInTheDocument();
  });

  it('shows the not found page when the character does not exist', async () => {
    renderApp({ route: '/detail/99999', mocks: [characterMock('99999', null)] });

    expect(await screen.findByRole('heading', { name: '404' })).toBeInTheDocument();
  });

  it('shows the not found page without querying the API for an invalid id', () => {
    renderApp({ route: '/detail/abc' });

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
  });
});
