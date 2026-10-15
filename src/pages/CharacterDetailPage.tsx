import { useQuery } from '@apollo/client/react';
import { useParams } from 'react-router';
import BackButton from '../components/BackButton';
import Loader from '../components/Loader';
import StatusMessage from '../components/StatusMessage';
import { GET_CHARACTER } from '../graphql/queries';
import NotFoundPage from './NotFoundPage';

const CharacterDetailPage = () => {
  const { id = '' } = useParams();
  const isValidId = /^\d+$/.test(id);

  const { data, loading, error } = useQuery(GET_CHARACTER, {
    variables: { id },
    skip: !isValidId,
  });

  if (!isValidId) return <NotFoundPage />;

  const character = data?.character;

  if (!loading && !error && !character) return <NotFoundPage />;

  const firstEpisode = character?.episode[0];
  const lastEpisode = character?.episode.at(-1);

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-y-3">
      {loading ? (
        <Loader />
      ) : error || !character ? (
        <StatusMessage>
          Something went wrong loading the character. Please try again later.
        </StatusMessage>
      ) : (
        <div>
          <BackButton />
          <section className="flex flex-col items-center justify-center gap-3 rounded-2xl border-8 border-green-lime p-5">
            <img className="rounded-2xl" src={character.image} alt={character.name} />
            <div>
              <h1>Name: {character.name}</h1>
              <p>Status: {character.status}</p>
              <p>Gender: {character.gender}</p>
              <p>Species: {character.species}</p>
              {character.type !== '' && <p>Subspecies: {character.type}</p>}
              <p>Origin: {character.origin?.name}</p>
              <p>Location: {character.location?.name}</p>
              {firstEpisode && (
                <p>
                  First episode: n° {firstEpisode.id} &quot;{firstEpisode.name}&quot;
                </p>
              )}
              {lastEpisode && (
                <p>
                  Last episode: n° {lastEpisode.id} &quot;{lastEpisode.name}&quot;
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default CharacterDetailPage;
