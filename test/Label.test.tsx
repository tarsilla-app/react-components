import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Label } from '../src/label/Label.js';

describe('Label', () => {
  test('renders with id and value', () => {
    render(<Label id='my-label' value='Hello' />);
    const label = screen.getByText('Hello');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('id', 'my-label');
  });

  test('renders without value', () => {
    render(<Label id='empty-label' />);
    const label = document.getElementById('empty-label');
    expect(label).toBeInTheDocument();
  });

  test('throws when backgroundColor is "inherit"', () => {
    expect(() => render(<Label id='err-label' theme={{ backgroundColor: 'inherit' }} value='test' />)).toThrow(
      'backgroundColor cannot be "inherit"',
    );
  });

  test('applies custom theme color', () => {
    render(<Label id='themed-label' theme={{ backgroundColor: 'blue', color: 'red' }} value='Themed' />);
    const label = screen.getByText('Themed');
    expect(label).toBeInTheDocument();
  });

  test('has displayName "label"', () => {
    expect(Label.displayName).toBe('label');
  });
});
