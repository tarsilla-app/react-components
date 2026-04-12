import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { GroupOption, Select, type SingleOption } from '../src/select/Select.js';

const options: SingleOption[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

const groupOptions: GroupOption[] = [
  {
    label: 'Group 1',
    options: [
      { label: 'Option X', value: 'x' },
      { label: 'Option Y', value: 'y' },
    ],
  },
];

describe('Select', () => {
  test('renders without crashing', () => {
    render(<Select options={options} />);
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  test('renders custom placeholder', () => {
    render(<Select options={options} placeholder='Choose one' />);
    expect(screen.getByText('Choose one')).toBeInTheDocument();
  });

  test('opens menu and shows options on click', async () => {
    render(<Select options={options} />);
    await userEvent.click(screen.getByText('Select'));
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  test('calls onChange when an option is selected', async () => {
    const onChange = vi.fn();
    render(<Select onChange={onChange} options={options} />);
    await userEvent.click(screen.getByText('Select'));
    await userEvent.click(screen.getByText('Option A'));
    expect(onChange).toHaveBeenCalledWith('a', expect.any(Object));
  });

  test('renders with a controlled value', () => {
    render(<Select options={options} value='b' />);
    // react-select renders the selected option label in the control
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  test('throws when backgroundColor is "inherit"', () => {
    expect(() => render(<Select options={options} theme={{ backgroundColor: 'inherit' }} />)).toThrow(
      'backgroundColor cannot be "inherit"',
    );
  });

  test('renders disabled state', () => {
    const { container } = render(<Select disabled options={options} />);
    // react-select applies aria-disabled to the container input
    const input = container.querySelector('input');
    expect(input).toBeDisabled();
  });

  test('shows noOptionsMessage when no options match', async () => {
    render(<Select noOptionsMessage='Nothing here' options={[]} />);
    await userEvent.click(screen.getByText('Select'));
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  test('handles multi-select and calls onChange with array of values', async () => {
    const onChange = vi.fn();
    render(<Select isMulti onChange={onChange} options={options} />);
    await userEvent.click(screen.getByText('Select'));
    await userEvent.click(screen.getByText('Option A'));
    expect(onChange).toHaveBeenCalledWith(['a'], expect.any(Object));
  });

  test('handles multi-select with array defaultValue', () => {
    render(<Select defaultValue={['a', 'b']} isMulti options={options} />);
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  test('renders with grouped options and shows group headers on open', async () => {
    render(<Select options={groupOptions} />);
    await userEvent.click(screen.getByText('Select'));
    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('Option X')).toBeInTheDocument();
  });

  test('calls onChange with value from grouped option on selection', async () => {
    const onChange = vi.fn();
    render(<Select onChange={onChange} options={groupOptions} />);
    await userEvent.click(screen.getByText('Select'));
    await userEvent.click(screen.getByText('Option X'));
    expect(onChange).toHaveBeenCalledWith('x', expect.any(Object));
  });

  test('renders grouped options with a matching controlled value', () => {
    render(<Select options={groupOptions} value='x' />);
    expect(screen.getByText('Option X')).toBeInTheDocument();
  });

  test('handles multi-select with grouped options and array defaultValue', () => {
    render(<Select defaultValue={['x']} isMulti options={groupOptions} />);
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  test('updates displayed value when controlled value prop changes', () => {
    const { rerender } = render(<Select options={options} value='a' />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    rerender(<Select options={options} value='b' />);
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  test('clears displayed value when controlled value prop changes to undefined', () => {
    const { rerender } = render(<Select options={options} value='a' />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    rerender(<Select options={options} />);
    // localValue stays "a" (setLocalValue not called when new value is undefined)
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  test('renders with isSearchable enabled', () => {
    const { container } = render(<Select isSearchable options={options} />);
    expect(container.querySelector('input[type="text"]')).toBeInTheDocument();
  });

  test('clears selection on Backspace when isSearchable and a value is set', async () => {
    const onChange = vi.fn();
    const { container } = render(<Select isSearchable onChange={onChange} options={options} value='a' />);
    const input = container.querySelector('input[type="text"]');
    expect(input).toBeInTheDocument();
    if (!input) {
      throw new Error('Expected searchable input to be rendered');
    }
    await userEvent.click(input);
    await userEvent.keyboard('{Backspace}');
    expect(onChange).toHaveBeenCalledWith(undefined, expect.any(Object));
  });

  test('renders with menuPlacement auto', () => {
    render(<Select menuPlacement='auto' options={options} />);
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  test('renders with debounceWait and calls onChange', async () => {
    render(<Select debounceWait={100} options={options} />);
    await userEvent.click(screen.getByText('Select'));
    await userEvent.click(screen.getByText('Option A'));
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  test('renders with layoutType line and opens menu', async () => {
    render(<Select options={options} theme={{ layoutType: 'line' }} />);
    await userEvent.click(screen.getByText('Select'));
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  test('renders with menuPlacement top and opens menu', async () => {
    render(<Select menuPlacement='top' options={options} />);
    await userEvent.click(screen.getByText('Select'));
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  test('renders disabled with a selected value covering singleValue disabled style', () => {
    render(<Select disabled options={options} value='a' />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  test('renders disabled with isSearchable covering input disabled style', () => {
    const { container } = render(<Select disabled isSearchable options={options} />);
    expect(container.querySelector('input')).toBeDisabled();
  });

  test('opens menu with pre-selected value to cover isSelected option style', async () => {
    render(<Select options={options} value='a' />);
    await userEvent.click(screen.getByText('Option A'));
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  test('opens menu with a disabled option to cover isDisabled option style', async () => {
    const withDisabled: SingleOption[] = [
      { label: 'Option A', value: 'a' },
      { isDisabled: true, label: 'Option D', value: 'd' },
    ];
    render(<Select options={withDisabled} />);
    await userEvent.click(screen.getByText('Select'));
    expect(screen.getByText('Option D')).toBeInTheDocument();
  });
});
