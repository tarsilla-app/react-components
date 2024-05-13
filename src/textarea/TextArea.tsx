import { ChangeEventHandler, FocusEventHandler, forwardRef } from 'react';

import debounce from 'debounce';

import styles from './TextArea.module.css';

type Props = {
  id?: string;
  placeholder?: string;
  style?: 'line' | 'rounded';
  color?: string;
  backgroundColor?: string;
  width?: string;
  value?: string;
  defaultValue?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  disabled?: boolean;
  debounceWait?: number;

  rows?: number;
};

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      id,
      placeholder = undefined,
      style = 'rounded',
      color = 'black',
      backgroundColor = 'inherit',
      width = 'inherit',
      value,
      defaultValue,
      onChange,
      onBlur,
      minLength = undefined,
      maxLength = undefined,
      required = false,
      disabled = false,
      debounceWait = undefined,
    },
    ref,
  ) => {
    return (
      <textarea
        ref={ref}
        id={id}
        placeholder={placeholder}
        className={styles[`textarea-${style}`]}
        style={{
          '--color': color,
          '--background-color': backgroundColor,
          '--width': width,
        }}
        value={value}
        defaultValue={defaultValue}
        onChange={debounceWait ? debounce(onChange, debounceWait) : onChange}
        onBlur={onBlur}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
      />
    );
  },
);
TextArea.displayName = 'textarea';

export { TextArea, Props as TextAreaProps };
