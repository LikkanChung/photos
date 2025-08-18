import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Faq from '../../src/pages/Faq';
import faq from '../../src/content/faq.json';

describe('Faq', () => {
  it('renders title and items', () => {
    render(<Faq />);
    expect(screen.getByRole('heading', { level: 1, name: new RegExp(faq.title, 'i') })).toBeInTheDocument();
    // Ensure all question summaries are rendered
    for (const item of faq.items) {
      const matches = screen.getAllByText(new RegExp(item.q, 'i'));
      expect(matches.length).toBeGreaterThan(0);
    }
  });
});
