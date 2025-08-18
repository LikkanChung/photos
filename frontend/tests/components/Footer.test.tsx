import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Footer } from '../../src/components/Footer';
import site from '../../src/content/site.json';

describe('Footer', () => {
  it('renders copyright and social links', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    // Check copyright line contains the configured name
    expect(
      within(footer).getByText((content, node) =>
        node?.tagName === 'P' && content.includes(site.footer.copyright)
      )
    ).toBeInTheDocument();

    // Ensure each configured social link is present
    for (const item of site.footer.social) {
      expect(screen.getByRole('link', { name: new RegExp(item.label, 'i') })).toBeInTheDocument();
    }
  });
});
