import { useQuery } from '@apollo/client/react';
import CharacterCard from '../components/CharacterCard';
import Filters from '../components/Filters';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import StatusMessage from '../components/StatusMessage';
import { GET_CHARACTERS } from '../graphql/queries';
import useCharacterFilters from '../hooks/useCharacterFilters';
import useSpecies from '../hooks/useSpecies';

const HomePage = () => {
  const { filters, page, setFilters, setPage, clearFilters } = useCharacterFilters();
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
      <CharacterCard key={character.id} character={character} index={index} />
    ));
  };

  return (
    <div>
      <header className="mx-20 my-5">
        <nav className="flex max-w-screen flex-wrap items-center justify-evenly p-3">
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
      </header>
      <main className="flex flex-wrap items-center justify-center gap-4">{renderContent()}</main>
      {!loading && characters.length > 0 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
};

export default HomePage;
