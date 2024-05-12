import { ChangeEventHandler, FocusEventHandler, forwardRef } from 'react';

import debounce from 'debounce';

import styles from './Input.module.css';

type Props = {
  type?: 'line' | 'rounded';
  placeholder?: string;
  color?: string;
  backgroundColor?: string;
  width?: string;

  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  debounceWait?: number;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      type = 'rounded',
      color = 'black',
      backgroundColor = 'inherit',
      width = 'inherit',
      onChange,
      debounceWait,
      ...rest
    }: Props,
    ref,
  ) => {
    return (
      <input
        className={styles[`input-${type}`]}
        style={{
          '--color': color,
          '--background-color': backgroundColor,
          '--width': width,
        }}
        onChange={debounceWait ? debounce(onChange, debounceWait) : onChange}
        ref={ref}
        {...rest}
      />
    );
  },
);
Input.displayName = 'input';

export { Input };
