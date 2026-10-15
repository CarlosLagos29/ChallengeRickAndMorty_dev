import type { ChangeEvent } from 'react';
import { GENDER_OPTIONS, STATUS_OPTIONS } from '../constants/filters';
import type { CharacterFilters, Gender, Status } from '../types/character';

interface FiltersProps {
  filters: CharacterFilters;
  species: string[];
  onChange: (changes: Partial<CharacterFilters>) => void;
  onClear: () => void;
}

const selectClassName =
  'rounded-2xl border border-white bg-background p-1 transition duration-500 hover:border-transparent';

const Filters = ({ filters, species, onChange, onClear }: FiltersProps) => {
  const speciesOptions =
    filters.species && !species.includes(filters.species) ? [filters.species, ...species] : species;

  const handlerStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange({ status: event.target.value as Status | '' });
  };

  const handlerGender = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange({ gender: event.target.value as Gender | '' });
  };

  const handlerSpecies = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange({ species: event.target.value });
  };

  return (
    <div className="flex max-w-screen flex-wrap gap-3 bg-transparent">
      <select
        aria-label="Status"
        value={filters.status}
        onChange={handlerStatus}
        className={`${selectClassName} hover:bg-portal`}
      >
        <option value="">Status</option>
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status === 'unknown' ? 'Unknown' : status}
          </option>
        ))}
      </select>
      <select
        aria-label="Gender"
        value={filters.gender}
        onChange={handlerGender}
        className={`${selectClassName} hover:bg-green-lime`}
      >
        <option value="">Gender</option>
        {GENDER_OPTIONS.map((gender) => (
          <option key={gender} value={gender}>
            {gender === 'unknown' ? 'Unknown' : gender}
          </option>
        ))}
      </select>
      <select
        aria-label="Species"
        value={filters.species}
        onChange={handlerSpecies}
        className={`${selectClassName} hover:bg-portal`}
      >
        <option value="">Species</option>
        {speciesOptions.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <button
        onClick={onClear}
        className="rounded-2xl border border-white p-1 px-2 transition duration-500 hover:border-transparent hover:bg-portal"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
