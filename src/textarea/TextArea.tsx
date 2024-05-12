import { ChangeEventHandler, FocusEventHandler, forwardRef } from 'react';

import debounce from 'debounce';

import styles from './TextArea.module.css';

type Props = {
  type?: 'line' | 'rounded';
  placeholder?: string;
  color?: string;
  backgroundColor?: string;
  width?: string;

  rows?: number;

  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
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

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
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
      <textarea
        className={styles[`textarea-${type}`]}
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
TextArea.displayName = 'textarea';

export { TextArea };
