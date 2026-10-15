import type { MockLink } from '@apollo/client/testing';
import { fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { GET_CHARACTER, GET_CHARACTERS } from '../graphql/queries';
import type { Character } from '../types/character';
import { renderApp, speciesMocks } from '../test/utils';

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

const morty: Character = { ...rick, id: '2', name: 'Morty Smith' };

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

const listMock: MockLink.MockedResponse = {
  request: { query: GET_CHARACTERS, variables: { page: 1, filter: {} } },
  result: {
    data: {
      characters: {
        __typename: 'Characters',
        info: { __typename: 'Info', pages: 1 },
        results: [rick, morty].map(({ id, name, image }) => ({
          __typename: 'Character',
          id,
          name,
          image,
        })),
      },
    },
  },
  maxUsageCount: Number.POSITIVE_INFINITY,
};

const baseMocks = [...speciesMocks, listMock];

describe('CharacterDetailModal', () => {
  it('opens the character details over the list from the query param', async () => {
    renderApp({ route: '/?character=1', mocks: [...baseMocks, characterMock('1', rick)] });

    const dialog = await screen.findByRole('dialog', { name: 'Rick Sanchez' });
    expect(within(dialog).getByText('Alive')).toBeInTheDocument();
    expect(within(dialog).getByText('Earth (C-137)')).toBeInTheDocument();
    expect(within(dialog).getByText('#1 · Pilot')).toBeInTheDocument();
    expect(within(dialog).getByText('#51 · Rickmurai Jack')).toBeInTheDocument();
    expect(within(dialog).queryByText('Subspecies')).not.toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: 'Morty Smith', hidden: true }),
    ).toBeInTheDocument();
  });

  it('shows the subspecies when the character has one', async () => {
    const birdperson = { ...rick, id: '47', name: 'Birdperson', type: 'Bird-Person' };
    renderApp({ route: '/?character=47', mocks: [...baseMocks, characterMock('47', birdperson)] });

    const dialog = await screen.findByRole('dialog', { name: 'Birdperson' });
    expect(within(dialog).getByText('Subspecies')).toBeInTheDocument();
    expect(within(dialog).getByText('Bird-Person')).toBeInTheDocument();
  });

  it('shows a single episode card when the first and last episode are the same', async () => {
    const singleEpisode = { ...rick, episode: [{ id: '1', name: 'Pilot' }] };
    renderApp({ route: '/?character=1', mocks: [...baseMocks, characterMock('1', singleEpisode)] });

    const dialog = await screen.findByRole('dialog', { name: 'Rick Sanchez' });
    expect(within(dialog).getByText('Episode')).toBeInTheDocument();
    expect(within(dialog).queryByText('Last episode')).not.toBeInTheDocument();
  });

  it('shows a message when the character does not exist', async () => {
    renderApp({ route: '/?character=99999', mocks: [...baseMocks, characterMock('99999', null)] });

    expect(
      await screen.findByRole('dialog', {
        name: "This character doesn't exist in this dimension.",
      }),
    ).toBeInTheDocument();
  });

  it('opens from a card and goes back to the list when closed', async () => {
    const user = userEvent.setup();
    renderApp({ route: '/?page=1', mocks: [...baseMocks, characterMock('1', rick)] });

    await user.click(await screen.findByRole('link', { name: /Rick Sanchez/ }));
    expect(await screen.findByRole('dialog', { name: 'Rick Sanchez' })).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('/?page=1&character=1');

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('/?page=1');
  });

  it('closes with Escape when opened from a shared link', async () => {
    renderApp({ route: '/?character=1', mocks: [...baseMocks, characterMock('1', rick)] });

    const dialog = await screen.findByRole('dialog', { name: 'Rick Sanchez' });
    fireEvent(dialog, new Event('cancel', { cancelable: true }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent(/^\/$/);
  });

  it('closes when clicking the backdrop', async () => {
    const user = userEvent.setup();
    renderApp({ route: '/?character=1', mocks: [...baseMocks, characterMock('1', rick)] });

    const dialog = await screen.findByRole('dialog', { name: 'Rick Sanchez' });
    await user.click(dialog);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('moves between the characters of the current page', async () => {
    const user = userEvent.setup();
    renderApp({
      route: '/?character=1',
      mocks: [...baseMocks, characterMock('1', rick), characterMock('2', morty)],
    });

    const dialog = await screen.findByRole('dialog', { name: 'Rick Sanchez' });
    await screen.findByRole('heading', { name: 'Morty Smith', hidden: true });
    expect(within(dialog).getByRole('button', { name: 'Previous' })).toBeDisabled();

    await user.click(within(dialog).getByRole('button', { name: 'Next' }));
    expect(await screen.findByRole('dialog', { name: 'Morty Smith' })).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('/?character=2');
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('ignores an invalid character param', async () => {
    renderApp({ route: '/?character=abc', mocks: baseMocks });

    expect(await screen.findByRole('heading', { name: 'Rick Sanchez' })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
