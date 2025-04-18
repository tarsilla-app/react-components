import { ChangeEvent, ChangeEventHandler, FocusEventHandler, forwardRef, useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';
import debounce from 'debounce';

type ContainerProps = {
  layoutType: string;
  color: string;
  backgroundColor: string;
  disabledColor: string;
  disabledBackgroundColor: string;
  width: string;
};

const Container = styled.input<ContainerProps>`
  color: ${({ color }) => `${color}`};
  background-color: ${({ backgroundColor }) => `${backgroundColor}`};
  font-size: 16px;
  line-height: 21px;
  font-weight: 700;
  width: ${({ width }) => `${width}`};
  height: 24px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  border-color: ${({ color }) => color};
  border-style: solid;
  border-radius: ${({ layoutType }) => `${layoutType === 'line' ? '0px' : '12px'}`};

  border-top-width: ${({ layoutType }) => `${layoutType === 'line' ? '0px' : '1px'}`};
  border-right-width: ${({ layoutType }) => `${layoutType === 'line' ? '0px' : '1px'}`};
  border-bottom-width: 1px;
  border-left-width: ${({ layoutType }) => `${layoutType === 'line' ? '0px' : '1px'}`};

  padding-left: 8px;
  padding-right: 8px;

  cursor: text;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${({ color }) => `${color}`};
  }
  :-ms-input-placeholder {
    color: ${({ color }) => `${color}`};
  }

  :focus,
  :focus-visible {
    outline: none;
  }

  :disabled {
    cursor: not-allowed;
    color: ${({ disabledColor }) => `${disabledColor}`};
    background-color: ${({ disabledBackgroundColor }) => `${disabledBackgroundColor}`};
    border-color: ${({ disabledColor }) => disabledColor};

    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${({ disabledColor }) => `${disabledColor}`};
    }
    :-ms-input-placeholder {
      color: ${({ disabledColor }) => `${disabledColor}`};
    }
  }
`;

type InputProps = {
  id?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'tel';
  theme?: {
    layoutType?: 'line' | 'rounded';
    color?: string;
    backgroundColor?: string;
    disabledColor?: string;
    disabledBackgroundColor?: string;
    width?: string;
  };
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
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

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      placeholder = undefined,
      type = 'text',
      theme: {
        layoutType = 'rounded',
        color = 'inherit',
        backgroundColor = 'white',
        disabledColor = 'gray',
        disabledBackgroundColor = 'rgba(128, 128, 128, 0.2)',
        width = 'inherit',
      } = {},
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
    if (backgroundColor === 'inherit') {
      throw new Error('backgroundColor cannot be "inherit"');
    }

    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
      if (value !== undefined) {
        setLocalValue(value);
      }
    }, [value]);

    const debouncedOnChange = useMemo(
      () => (debounceWait && onChange ? debounce(onChange, debounceWait) : onChange),
      [onChange, debounceWait],
    );

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      setLocalValue(e.target.value);
      debouncedOnChange?.(e);
    }

    return (
      <Container
        ref={ref}
        id={id}
        placeholder={placeholder}
        type={type}
        layoutType={layoutType}
        color={color}
        backgroundColor={backgroundColor}
        disabledColor={disabledColor}
        disabledBackgroundColor={disabledBackgroundColor}
        width={width}
        value={localValue}
        defaultValue={defaultValue}
        onChange={handleChange}
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
Input.displayName = 'input';

export { Input, type InputProps };
