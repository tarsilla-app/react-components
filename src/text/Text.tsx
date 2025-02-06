import { ChangeEventHandler, FocusEventHandler, forwardRef } from 'react';

import styled from '@emotion/styled';
import debounce from 'debounce';

type ContainerProps = {
  layoutType: string;
  color: string;
  backgroundColor: string;
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

  border: ${({ layoutType, color }) => `${layoutType === 'line' ? 0 : `1px solid ${color}`}`};
  border-bottom: ${({ layoutType, color }) => `${layoutType === 'line' ? `1px solid ${color}` : undefined}`};
  border-radius: ${({ layoutType }) => `${layoutType === 'line' ? undefined : '12px'}`};
  padding-left: ${({ layoutType }) => `${layoutType === 'line' ? undefined : '8px'}`};
  padding-right: ${({ layoutType }) => `${layoutType === 'line' ? undefined : '8px'}`};

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${({ color }) => `${color}`};
  }
  :-ms-input-placeholder {
    color: ${({ color }) => `${color}`};
  }

  :focus,
    outline: none;
  }
`;

type Props = {
  id?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'tel';
  style?: {
    layoutType?: 'line' | 'rounded';
    color?: string;
    backgroundColor?: string;
    width?: string;
  };
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

const defaultStyle = {
  layoutType: 'rounded',
  color: 'black',
  backgroundColor: 'inherit',
  width: 'inherit',
};
const Text = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      placeholder = undefined,
      type = 'text',
      style,
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
    const appliedStyle = { ...defaultStyle, ...style };
    //TODO disabled colors
    return (
      <Container
        ref={ref}
        id={id}
        placeholder={placeholder}
        type={type}
        {...appliedStyle}
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
