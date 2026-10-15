import { useSearchParams } from 'react-router';
import { GENDER_OPTIONS, STATUS_OPTIONS } from '../constants/filters';
import type { CharacterFilters, Gender, Status } from '../types/character';

const FILTER_KEYS = ['name', 'status', 'gender', 'species'] as const;

const parseOption = <T extends string>(value: string | null, options: readonly T[]): T | '' =>
  options.find((option) => option === value) ?? '';

const parsePage = (value: string | null): number => {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

const useCharacterFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: CharacterFilters = {
    name: searchParams.get('name') ?? '',
    status: parseOption<Status>(searchParams.get('status'), STATUS_OPTIONS),
    gender: parseOption<Gender>(searchParams.get('gender'), GENDER_OPTIONS),
    species: searchParams.get('species') ?? '',
  };
  const page = parsePage(searchParams.get('page'));
  const hasFilters = FILTER_KEYS.some((key) => filters[key] !== '');

  const setFilters = (changes: Partial<CharacterFilters>) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      for (const [key, value] of Object.entries(changes)) {
        if (value) params.set(key, value);
        else params.delete(key);
      }
      params.delete('page');
      params.delete('character');
      return params;
    });
  };

  const setPage = (nextPage: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (nextPage > 1) params.set('page', String(nextPage));
      else params.delete('page');
      params.delete('character');
      return params;
    });
  };

  const clearFilters = () => setSearchParams({});

  return { filters, page, hasFilters, setFilters, setPage, clearFilters };
};

export default useCharacterFilters;
