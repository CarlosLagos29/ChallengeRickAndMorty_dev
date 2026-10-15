import { act, renderHook, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { withRouter } from '../test/utils';
import useCharacterFilters from './useCharacterFilters';

const renderFilters = (route = '/') =>
  renderHook(() => useCharacterFilters(), { wrapper: withRouter(route) });

describe('useCharacterFilters', () => {
  it('returns empty filters and page 1 without query params', () => {
    const { result } = renderFilters();

    expect(result.current.filters).toEqual({ name: '', status: '', gender: '', species: '' });
    expect(result.current.page).toBe(1);
    expect(result.current.hasFilters).toBe(false);
  });

  it('reads filters and page from the URL', () => {
    const { result } = renderFilters('/?name=rick&status=Alive&gender=Male&species=Human&page=3');

    expect(result.current.filters).toEqual({
      name: 'rick',
      status: 'Alive',
      gender: 'Male',
      species: 'Human',
    });
    expect(result.current.page).toBe(3);
    expect(result.current.hasFilters).toBe(true);
  });

  it('ignores invalid status, gender and page values', () => {
    const { result } = renderFilters('/?status=Zombie&gender=Robot&page=-2');

    expect(result.current.filters.status).toBe('');
    expect(result.current.filters.gender).toBe('');
    expect(result.current.page).toBe(1);
  });

  it('resets the page when a filter changes', () => {
    const { result } = renderFilters('/?status=Alive&page=4');

    act(() => result.current.setFilters({ gender: 'Female' }));

    expect(result.current.filters).toMatchObject({ status: 'Alive', gender: 'Female' });
    expect(result.current.page).toBe(1);
    expect(screen.getByTestId('location')).toHaveTextContent('/?status=Alive&gender=Female');
  });

  it('removes a filter from the URL when it is cleared', () => {
    const { result } = renderFilters('/?status=Alive&name=rick');

    act(() => result.current.setFilters({ name: '' }));

    expect(screen.getByTestId('location')).toHaveTextContent('/?status=Alive');
  });

  it('keeps the filters when the page changes and omits page 1', () => {
    const { result } = renderFilters('/?name=rick');

    act(() => result.current.setPage(2));
    expect(screen.getByTestId('location')).toHaveTextContent('/?name=rick&page=2');

    act(() => result.current.setPage(1));
    expect(screen.getByTestId('location')).toHaveTextContent('/?name=rick');
  });

  it('clears every filter', () => {
    const { result } = renderFilters('/?name=rick&status=Dead&page=2');

    act(() => result.current.clearFilters());

    expect(result.current.hasFilters).toBe(false);
    expect(screen.getByTestId('location')).toHaveTextContent(/^\/$/);
  });
});
