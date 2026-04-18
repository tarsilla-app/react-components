import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { TextArea } from '../src/textarea/TextArea.js';

describe('TextArea', () => {
  test('renders without crashing', () => {
    render(<TextArea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders with placeholder', () => {
    render(<TextArea placeholder='Enter text' />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  test('renders with id', () => {
    render(<TextArea id='my-textarea' />);
    expect(document.getElementById('my-textarea')).toBeInTheDocument();
  });

  test('renders as disabled', () => {
    render(<TextArea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  test('fires onChange when user types', async () => {
    const onChange = vi.fn();
    render(<TextArea onChange={onChange} />);
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'hello');
    expect(onChange).toHaveBeenCalled();
  });

  test('reflects controlled value', () => {
    render(<TextArea value='controlled' />);
    expect(screen.getByDisplayValue('controlled')).toBeInTheDocument();
  });

  test('reflects defaultValue', () => {
    render(<TextArea defaultValue='default text' />);
    expect(screen.getByDisplayValue('default text')).toBeInTheDocument();
  });

  test('renders as required', () => {
    render(<TextArea required />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });

  test('throws when backgroundColor is "inherit"', () => {
    expect(() => render(<TextArea theme={{ backgroundColor: 'inherit' }} />)).toThrow(
      'backgroundColor cannot be "inherit"',
    );
  });

  test('fires onBlur', async () => {
    const onBlur = vi.fn();
    render(<TextArea onBlur={onBlur} />);
    const textarea = screen.getByRole('textbox');
    await userEvent.click(textarea);
    await userEvent.tab();
    expect(onBlur).toHaveBeenCalled();
  });

  test('renders with rows prop', () => {
    render(<TextArea rows={5} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  test('updates local value when controlled value prop changes', () => {
    const { rerender } = render(<TextArea value='first' />);
    rerender(<TextArea value='second' />);
    expect(screen.getByDisplayValue('second')).toBeInTheDocument();
  });

  test('does not crash when controlled value changes to undefined', () => {
    const { rerender } = render(<TextArea value='first' />);
    rerender(<TextArea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders with line layout type', () => {
    render(<TextArea theme={{ layoutType: 'line' }} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('fires debounced onChange when debounceWait is set', () => {
    vi.useFakeTimers();
    const onChange = vi.fn();
    render(<TextArea debounceWait={100} onChange={onChange} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'a' } });
    expect(onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(onChange).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  test('calls onChange immediately when debounceWait is 0', () => {
    const onChange = vi.fn();
    render(<TextArea debounceWait={0} onChange={onChange} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'a' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
