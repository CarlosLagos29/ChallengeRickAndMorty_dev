import { useState, type ChangeEvent, type FormEvent } from 'react';

interface SearchBarProps {
  initialValue: string;
  onSearch: (name: string) => void;
}

const SearchBar = ({ initialValue, onSearch }: SearchBarProps) => {
  const [search, setSearch] = useState(initialValue);

  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handlerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(search.trim());
  };

  return (
    <form
      role="search"
      onSubmit={handlerSubmit}
      className="flex h-10 w-full items-center rounded-2xl border border-white focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-portal lg:flex-1 xl:w-64 xl:flex-none"
    >
      <input
        className="min-w-0 flex-1 bg-transparent pl-3 focus-visible:outline-none [&::-webkit-search-cancel-button]:appearance-none"
        type="search"
        value={search}
        onChange={handlerChange}
        placeholder="Search by name"
        aria-label="Search characters by name"
      />
      <button
        type="submit"
        aria-label="Search"
        className="mr-1 grid size-8 shrink-0 place-items-center rounded-full transition duration-300 hover:bg-green-lime hover:text-background focus-visible:outline-offset-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m20 20-4.5-4.5" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
