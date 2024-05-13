import { ChangeEventHandler, FocusEventHandler, forwardRef } from 'react';

import debounce from 'debounce';

import styles from './Text.module.css';

type Props = {
  id?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'tel';
  style?: 'line' | 'rounded';
  color?: string;
  backgroundColor?: string;
  width?: string;
  value?: string;
  defaultValue?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  debounceWait?: number;
};

const Text = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      placeholder = undefined,
      type = 'text',
      style = 'rounded',
      color = 'black',
      backgroundColor = 'inherit',
      width = 'inherit',
      value,
      defaultValue,
      onChange,
      onBlur,
      min = undefined,
      max = undefined,
      minLength = undefined,
      maxLength = undefined,
      pattern = undefined,
      required = false,
      disabled = false,
      debounceWait = undefined,
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        id={id}
        placeholder={placeholder}
        type={type}
        className={styles[`text-${style}`]}
        style={{
          '--color': color,
          '--background-color': backgroundColor,
          '--width': width,
        }}
        value={value}
        defaultValue={defaultValue}
        onChange={debounceWait ? debounce(onChange, debounceWait) : onChange}
        onBlur={onBlur}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        required={required}
        disabled={disabled}
      />
    );
  },
);
Text.displayName = 'text';

export { Text, Props as TextProps };
