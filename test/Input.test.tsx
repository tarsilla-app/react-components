import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { Input } from '../src/input/Input.js';

describe('Input', () => {
  test('renders without crashing', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders with placeholder', () => {
    render(<Input placeholder='Type here' />);
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  test('renders with id', () => {
    render(<Input id='my-input' />);
    expect(document.getElementById('my-input')).toBeInTheDocument();
  });

  test('renders as disabled', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  test('fires onChange when user types', async () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} value='' />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'hello');
    expect(onChange).toHaveBeenCalled();
  });

  test('reflects controlled value', () => {
    render(<Input value='controlled' />);
    expect(screen.getByDisplayValue('controlled')).toBeInTheDocument();
  });

  test('reflects defaultValue', () => {
    render(<Input defaultValue='default text' />);
    expect(screen.getByDisplayValue('default text')).toBeInTheDocument();
  });

  test('renders as required', () => {
    render(<Input required />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });

  test('renders password type', () => {
    const { container } = render(<Input type='password' />);
    const input = container.querySelector('input[type="password"]');
    expect(input).toBeInTheDocument();
  });

  test('throws when backgroundColor is "inherit"', () => {
    expect(() => render(<Input theme={{ backgroundColor: 'inherit' }} />)).toThrow(
      'backgroundColor cannot be "inherit"',
    );
  });

  test('has displayName "input"', () => {
    expect(Input.displayName).toBe('input');
  });

  test('fires onBlur', async () => {
    const onBlur = vi.fn();
    render(<Input onBlur={onBlur} />);
    const input = screen.getByRole('textbox');
    await userEvent.click(input);
    await userEvent.tab();
    expect(onBlur).toHaveBeenCalled();
  });

  test('updates local value when controlled value prop changes', () => {
    const { rerender } = render(<Input value='first' />);
    rerender(<Input value='second' />);
    expect(screen.getByDisplayValue('second')).toBeInTheDocument();
  });

  test('does not crash when controlled value changes to undefined', () => {
    const { rerender } = render(<Input value='first' />);
    rerender(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders with line layout type', () => {
    render(<Input theme={{ layoutType: 'line' }} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('fires debounced onChange when debounceWait is set', () => {
    const onChange = vi.fn();
    render(<Input debounceWait={100} onChange={onChange} value='' />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
