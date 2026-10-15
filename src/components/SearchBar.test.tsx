import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('shows the initial value', () => {
    render(<SearchBar initialValue="rick" onSearch={vi.fn()} />);

    expect(screen.getByRole('searchbox')).toHaveValue('rick');
  });

  it('searches the trimmed value when pressing Enter', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();
    render(<SearchBar initialValue="" onSearch={handleSearch} />);

    await user.type(screen.getByRole('searchbox'), '  morty {Enter}');

    expect(handleSearch).toHaveBeenCalledWith('morty');
  });

  it('searches when clicking the search button', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();
    render(<SearchBar initialValue="" onSearch={handleSearch} />);

    await user.type(screen.getByRole('searchbox'), 'summer');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(handleSearch).toHaveBeenCalledWith('summer');
  });
});
