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
    <form role="search" onSubmit={handlerSubmit} className="flex max-w-screen gap-2 p-2">
      <input
        className="max-w-screen rounded-2xl border border-white bg-transparent p-1 px-2"
        type="search"
        value={search}
        onChange={handlerChange}
        placeholder="Search by name"
        aria-label="Search characters by name"
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex items-center rounded-2xl border border-white p-1 px-2 transition duration-500 hover:border-transparent hover:bg-green-lime"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
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
