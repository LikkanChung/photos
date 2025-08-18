import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../../src/components/Header';
import site from '../../src/content/site.json';

describe('Header', () => {
  it('renders brand and nav links', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: new RegExp(site.header.brand, 'i') })).toBeInTheDocument();

    // Ensure each configured nav item is present
    for (const item of site.header.nav) {
      expect(screen.getAllByRole('link', { name: new RegExp(item.label, 'i') }).length).toBeGreaterThan(0);
    }
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
