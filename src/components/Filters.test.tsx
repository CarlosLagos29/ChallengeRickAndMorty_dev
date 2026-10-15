import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { CharacterFilters } from '../types/character';
import Filters from './Filters';

const emptyFilters: CharacterFilters = { name: '', status: '', gender: '', species: '' };

const renderFilters = (filters = emptyFilters) =>
  render(
    <Filters filters={filters} species={['Alien', 'Human']} onChange={vi.fn()} onClear={vi.fn()} />,
  );

describe('Filters', () => {
  it('starts collapsed with a toggle to show the filters', () => {
    renderFilters();

    expect(screen.getByRole('button', { name: 'Show filters' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.queryByRole('button', { name: 'Hide filters' })).not.toBeInTheDocument();
  });

  it('shows how many filters are active in the toggle', () => {
    renderFilters({ ...emptyFilters, status: 'Alive', species: 'Human' });

    expect(screen.getByRole('button', { name: 'Show filters (2 active)' })).toBeInTheDocument();
  });

  it('expands and collapses the panel moving the focus', async () => {
    const user = userEvent.setup();
    renderFilters();

    await user.click(screen.getByRole('button', { name: 'Show filters' }));
    expect(screen.getByRole('combobox', { name: 'Status' })).toHaveFocus();

    const hideButton = screen.getByRole('button', { name: 'Hide filters' });
    expect(hideButton).toHaveAttribute('aria-expanded', 'true');

    await user.click(hideButton);
    expect(screen.getByRole('button', { name: 'Show filters' })).toHaveFocus();
  });
});
