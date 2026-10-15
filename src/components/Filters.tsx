import { useId, useRef, useState, type ChangeEvent } from 'react';
import { flushSync } from 'react-dom';
import { GENDER_OPTIONS, STATUS_OPTIONS } from '../constants/filters';
import type { CharacterFilters, Gender, Status } from '../types/character';

interface FiltersProps {
  filters: CharacterFilters;
  species: string[];
  onChange: (changes: Partial<CharacterFilters>) => void;
  onClear: () => void;
}

const selectClassName =
  'w-full rounded-2xl border border-white bg-background px-2 py-1 transition duration-300 hover:border-transparent hover:text-background md:w-auto [&>option]:bg-background [&>option]:text-white';

const toggleClassName =
  'flex w-full justify-center rounded-lg py-1 text-2xl leading-none transition duration-300 hover:text-green-lime md:hidden';

const Filters = ({ filters, species, onChange, onClear }: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const firstSelectRef = useRef<HTMLSelectElement>(null);
  const activeCount = [filters.status, filters.gender, filters.species].filter(Boolean).length;
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

  const handlerOpen = () => {
    flushSync(() => setIsOpen(true));
    firstSelectRef.current?.focus();
  };

  const handlerClose = () => {
    flushSync(() => setIsOpen(false));
    openButtonRef.current?.focus();
  };

  return (
    <div className="flex w-full flex-col gap-2 md:w-auto lg:shrink-0">
      {!isOpen && (
        <button
          ref={openButtonRef}
          onClick={handlerOpen}
          aria-expanded={false}
          aria-controls={panelId}
          aria-label={activeCount > 0 ? `Show filters (${activeCount} active)` : 'Show filters'}
          className={toggleClassName}
        >
          <span aria-hidden="true">▾</span>
        </button>
      )}
      <div
        id={panelId}
        className={`${isOpen ? 'grid' : 'hidden'} grid-cols-2 gap-2 md:flex md:flex-wrap md:items-center md:gap-3`}
      >
        <select
          ref={firstSelectRef}
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
          className={`${selectClassName} hover:bg-portal md:max-w-56`}
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
          className="rounded-2xl border border-white px-2 py-1 transition duration-300 hover:border-transparent hover:bg-portal hover:text-background"
        >
          Clear filters
        </button>
        {isOpen && (
          <button
            onClick={handlerClose}
            aria-expanded={true}
            aria-controls={panelId}
            aria-label="Hide filters"
            className={`${toggleClassName} col-span-2`}
          >
            <span aria-hidden="true">▴</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;
