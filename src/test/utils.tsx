import type { ReactNode } from 'react';
import { MockedProvider } from '@apollo/client/testing/react';
import type { MockLink } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import App from '../App';
import { GET_CHARACTERS_COUNT, GET_SPECIES } from '../graphql/queries';

export const speciesMocks: MockLink.MockedResponse[] = [
  {
    request: { query: GET_CHARACTERS_COUNT },
    result: {
      data: { characters: { __typename: 'Characters', info: { __typename: 'Info', count: 2 } } },
    },
  },
  {
    request: { query: GET_SPECIES, variables: { ids: ['1', '2'] } },
    result: {
      data: {
        charactersByIds: [
          { __typename: 'Character', species: 'Human' },
          { __typename: 'Character', species: 'Alien' },
        ],
      },
    },
  },
];

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location">{`${location.pathname}${location.search}`}</div>;
};

interface RenderAppOptions {
  route?: string;
  mocks?: ReadonlyArray<MockLink.MockedResponse>;
}

export const renderApp = ({ route = '/', mocks = [] }: RenderAppOptions = {}) =>
  render(
    <MockedProvider mocks={mocks}>
      <MemoryRouter initialEntries={[route]}>
        <App />
        <LocationDisplay />
      </MemoryRouter>
    </MockedProvider>,
  );

export const withRouter =
  (route = '/') =>
  ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[route]}>
      {children}
      <LocationDisplay />
    </MemoryRouter>
  );
