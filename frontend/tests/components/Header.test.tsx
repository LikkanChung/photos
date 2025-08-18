import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../../src/components/Header';

describe('Header', () => {
  it('renders site name and nav links', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /photos/i })).toBeInTheDocument();
    const about = screen.getAllByRole('link', { name: /about/i });
    const contact = screen.getAllByRole('link', { name: /contact/i });
    expect(about.length).toBeGreaterThan(0);
    expect(contact.length).toBeGreaterThan(0);
  });

  it('toggles mobile menu', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: /toggle navigation/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
