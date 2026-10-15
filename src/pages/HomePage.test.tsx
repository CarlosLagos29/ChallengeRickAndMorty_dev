import type { MockLink } from '@apollo/client/testing';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { GET_CHARACTERS } from '../graphql/queries';
import { renderApp, speciesMocks } from '../test/utils';

const character = (id: string, name: string) => ({
  __typename: 'Character',
  id,
  name,
  image: `https://example.com/${id}.jpeg`,
});

const charactersMock = (
  variables: { page: number; filter: Record<string, string> },
  results: ReturnType<typeof character>[],
  pages: number | null = 1,
): MockLink.MockedResponse => ({
  request: { query: GET_CHARACTERS, variables },
  result: {
    data: {
      characters: {
        __typename: 'Characters',
        info: { __typename: 'Info', pages },
        results,
      },
    },
  },
});

describe('HomePage', () => {
  it('shows the loader and then the characters', async () => {
    renderApp({
      mocks: [
        ...speciesMocks,
        charactersMock({ page: 1, filter: {} }, [
          character('1', 'Rick Sanchez'),
          character('2', 'Morty Smith'),
        ]),
      ],
    });

    expect(screen.getByRole('status')).toHaveTextContent('Loading...');
    expect(await screen.findByRole('heading', { name: 'Rick Sanchez' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Morty Smith' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Rick Sanchez/ })).toHaveAttribute('href', '/detail/1');
  });

  it('queries the API with the filters from the URL', async () => {
    renderApp({
      route: '/?status=Alive&species=Human&page=2',
      mocks: [
        ...speciesMocks,
        charactersMock(
          { page: 2, filter: { status: 'Alive', species: 'Human' } },
          [character('5', 'Jerry Smith')],
          3,
        ),
      ],
    });

    expect(await screen.findByRole('heading', { name: 'Jerry Smith' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Status' })).toHaveValue('Alive');
    expect(screen.getByRole('combobox', { name: 'Species' })).toHaveValue('Human');
    expect(screen.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page');
  });

  it('loads the species options', async () => {
    renderApp({ mocks: [...speciesMocks, charactersMock({ page: 1, filter: {} }, [])] });

    const speciesSelect = screen.getByRole('combobox', { name: 'Species' });
    expect(await within(speciesSelect).findByRole('option', { name: 'Alien' })).toBeInTheDocument();
    expect(within(speciesSelect).getByRole('option', { name: 'Human' })).toBeInTheDocument();
  });

  it('updates the URL when a filter changes', async () => {
    const user = userEvent.setup();
    renderApp({
      route: '/?page=3',
      mocks: [
        ...speciesMocks,
        charactersMock({ page: 3, filter: {} }, [character('1', 'Rick Sanchez')], 5),
        charactersMock({ page: 1, filter: { gender: 'Female' } }, [character('3', 'Summer Smith')]),
      ],
    });

    await screen.findByRole('heading', { name: 'Rick Sanchez' });
    await user.selectOptions(screen.getByRole('combobox', { name: 'Gender' }), 'Female');

    expect(screen.getByTestId('location')).toHaveTextContent('/?gender=Female');
    expect(await screen.findByRole('heading', { name: 'Summer Smith' })).toBeInTheDocument();
  });

  it('shows an empty state when there are no results', async () => {
    renderApp({
      route: '/?name=zzz',
      mocks: [...speciesMocks, charactersMock({ page: 1, filter: { name: 'zzz' } }, [], null)],
    });

    expect(await screen.findByText('No characters found')).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Pagination' })).not.toBeInTheDocument();
  });

  it('shows an error message when the request fails', async () => {
    renderApp({
      mocks: [
        ...speciesMocks,
        {
          request: { query: GET_CHARACTERS, variables: { page: 1, filter: {} } },
          error: new Error('Network error'),
        },
      ],
    });

    expect(
      await screen.findByText(/Something went wrong loading the characters/),
    ).toBeInTheDocument();
  });
});
