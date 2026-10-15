import { useQuery } from '@apollo/client/react';
import CharacterCard from '../components/CharacterCard';
import Filters from '../components/Filters';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import StatusMessage from '../components/StatusMessage';
import { GET_CHARACTERS } from '../graphql/queries';
import useCharacterFilters from '../hooks/useCharacterFilters';
import useCharacterModal from '../hooks/useCharacterModal';
import useSpecies from '../hooks/useSpecies';
import CharacterDetailModal from './CharacterDetailModal';

const HomePage = () => {
  const { filters, page, setFilters, setPage, clearFilters } = useCharacterFilters();
  const { characterId, getCharacterHref, showCharacter, closeCharacter } = useCharacterModal();
  const species = useSpecies();

  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: {
      page,
      filter: {
        name: filters.name || undefined,
        status: filters.status || undefined,
        gender: filters.gender || undefined,
        species: filters.species || undefined,
      },
    },
  });

  const characters = data?.characters?.results ?? [];
  const totalPages = data?.characters?.info.pages ?? 1;

  const renderContent = () => {
    if (loading) return <Loader />;
    if (error) {
      return (
        <StatusMessage>
          Something went wrong loading the characters. Please try again later.
        </StatusMessage>
      );
    }
    if (characters.length === 0) return <StatusMessage>No characters found</StatusMessage>;
    return characters.map((character, index) => (
      <CharacterCard
        key={character.id}
        character={character}
        index={index}
        href={getCharacterHref(character.id)}
      />
    ));
  };

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-white/10 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 xl:py-6 xl:flex-row xl:items-center xl:justify-between">
          <h1 className="shrink-0 text-3xl text-green-lime">Rick and Morty</h1>
          <nav className="flex flex-col gap-3 lg:flex-row lg:items-center xl:justify-end">
            <SearchBar
              key={filters.name}
              initialValue={filters.name}
              onSearch={(name) => setFilters({ name })}
            />
            <Filters
              filters={filters}
              species={species}
              onChange={setFilters}
              onClear={clearFilters}
            />
          </nav>
        </div>
      </header>
      <main className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-6 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] sm:gap-5">
        {renderContent()}
      </main>
      {!loading && characters.length > 0 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
      {characterId && (
        <CharacterDetailModal
          characterId={characterId}
          characterIds={characters.map(({ id }) => id)}
          onClose={closeCharacter}
          onNavigate={showCharacter}
        />
      )}
    </>
  );
};

export default HomePage;
