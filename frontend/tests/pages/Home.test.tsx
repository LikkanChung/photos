import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Home } from '../../src/pages/Home';

describe('Home', () => {
  it('renders hero, about, and contact sections', () => {
    render(<Home />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /capturing moments/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /contact/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /get in touch/i })).toBeInTheDocument();
  });
});
