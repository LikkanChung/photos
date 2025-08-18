import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Home } from '../../src/pages/Home';
import site from '../../src/content/site.json';

describe('Home', () => {
  it('renders hero, about, featured, and contact sections', () => {
    render(<Home />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: new RegExp(site.home.hero.title, 'i') })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: new RegExp(site.home.about.title, 'i') })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: new RegExp(site.home.featured.title, 'i') })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: new RegExp(site.home.contactTitle, 'i') })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: new RegExp(site.home.hero.cta.text, 'i') })).toBeInTheDocument();
  });
});
