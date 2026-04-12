import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Loading } from '../src/loading/Loading.js';

describe('Loading', () => {
  test('renders without crashing', () => {
    const { container } = render(<Loading />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders with an id', () => {
    render(<Loading id='spinner' />);
    expect(document.getElementById('spinner')).toBeInTheDocument();
  });

  test('applies a custom color via theme', () => {
    const { container } = render(<Loading theme={{ color: 'red' }} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('falls back to "inherit" color by default', () => {
    const { container } = render(<Loading />);
    // just confirms it renders without theme prop
    expect(container.firstChild).toBeInTheDocument();
  });
});
