import debounce from 'debounce';
import styled from '@emotion/styled';
import { ChangeEvent, ChangeEventHandler, FocusEventHandler, useMemo, useState } from 'react';

type ContainerProps = {
  backgroundColor: string;
  color: string;
  disabledBackgroundColor: string;
  disabledColor: string;
  layoutType: string;
  width: string;
};

const Container = styled.input<ContainerProps>`
  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-size: 16px;
  line-height: 21px;
  font-weight: 700;
  width: ${({ width }) => width};
  height: 24px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  border-color: ${({ color }) => color};
  border-style: solid;
  border-radius: ${({ layoutType }) => (layoutType === 'line' ? '0px' : '12px')};

  border-top-width: ${({ layoutType }) => (layoutType === 'line' ? '0px' : '1px')};
  border-right-width: ${({ layoutType }) => (layoutType === 'line' ? '0px' : '1px')};
  border-bottom-width: 1px;
  border-left-width: ${({ layoutType }) => (layoutType === 'line' ? '0px' : '1px')};

  padding-left: 8px;
  padding-right: 8px;

  cursor: text;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${({ color }) => color};
  }
  :-ms-input-placeholder {
    color: ${({ color }) => color};
  }

  :focus,
  :focus-visible {
    outline: none;
  }

  :disabled {
    cursor: not-allowed;
    color: ${({ disabledColor }) => disabledColor};
    background-color: ${({ disabledBackgroundColor }) => disabledBackgroundColor};
    border-color: ${({ disabledColor }) => disabledColor};

    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${({ disabledColor }) => disabledColor};
    }
    :-ms-input-placeholder {
      color: ${({ disabledColor }) => disabledColor};
    }
  }
`;

type InputProps = {
  debounceWait?: number;
  defaultValue?: string;
  disabled?: boolean;
  id?: string;
  max?: number;
  maxLength?: number;
  min?: number;
  minLength?: number;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  theme?: {
    backgroundColor?: string;
    color?: string;
    disabledBackgroundColor?: string;
    disabledColor?: string;
    layoutType?: 'line' | 'rounded';
    width?: string;
  };
  type?: 'email' | 'number' | 'password' | 'tel' | 'text';
  value?: string;
};

const DEFAULT_THEME: NonNullable<InputProps['theme']> = {};

const Input = ({
  debounceWait,
  defaultValue,
  disabled = false,
  id,
  max,
  maxLength,
  min,
  minLength,
  onBlur,
  onChange,
  pattern,
  placeholder,
  ref,
  required = false,
  theme: {
    backgroundColor = 'white',
    color = 'inherit',
    disabledBackgroundColor = 'rgba(128, 128, 128, 0.2)',
    disabledColor = 'gray',
    layoutType = 'rounded',
    width = 'inherit',
  } = DEFAULT_THEME,
  type = 'text',
  value,
}: InputProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
  if (backgroundColor === 'inherit') {
    throw new Error('backgroundColor cannot be "inherit"');
  }

  const [localValue, setLocalValue] = useState(value);
  const [prevPropValue, setPrevPropValue] = useState(value);

  if (prevPropValue !== value) {
    setPrevPropValue(value);
    if (value !== undefined) {
      setLocalValue(value);
    }
  }

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
      backgroundColor={backgroundColor}
      color={color}
      defaultValue={defaultValue}
      disabled={disabled}
      disabledBackgroundColor={disabledBackgroundColor}
      disabledColor={disabledColor}
      id={id}
      layoutType={layoutType}
      max={max}
      maxLength={maxLength}
      min={min}
      minLength={minLength}
      onBlur={onBlur}
      onChange={handleChange}
      pattern={pattern}
      placeholder={placeholder}
      ref={ref}
      required={required}
      type={type}
      value={localValue}
      width={width}
    />
  );
};
Input.displayName = 'input';

export { Input, type InputProps };
