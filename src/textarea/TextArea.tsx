import { ChangeEventHandler, FocusEventHandler, forwardRef } from 'react';

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

const Container = styled.textarea<ContainerProps>`
  color: ${({ color }) => `${color}`};
  background-color: ${({ backgroundColor }) => `${backgroundColor}`};
  font-size: 16px;
  line-height: 21px;
  font-weight: 700;
  width: ${({ width }) => `${width}`};
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  border: ${({ layoutType, color }) => `${layoutType === 'line' ? 0 : `1px solid ${color}`}`};
  border-bottom: ${({ layoutType, color }) => `${layoutType === 'line' ? `1px solid ${color}` : undefined}`};
  border-radius: ${({ layoutType }) => `${layoutType === 'line' ? undefined : '12px'}`};
  padding: ${({ layoutType }) => `${layoutType === 'line' ? '2px 2px' : undefined}`};
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
  :focus-visible {
    outline: none;
  }

  :disabled {
    cursor: not-allowed;
    color: ${({ disabledColor }) => `${disabledColor}`};
    background-color: ${({ disabledBackgroundColor }) => `${disabledBackgroundColor}`};

    border: ${({ layoutType, disabledColor }) => `${layoutType === 'line' ? 0 : `1px solid ${disabledColor}`}`};
    border-bottom: ${({ layoutType, disabledColor }) =>
      `${layoutType === 'line' ? `1px solid ${disabledColor}` : undefined}`};

    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${({ disabledColor }) => `${disabledColor}`};
    }
    :-ms-input-placeholder {
      color: ${({ disabledColor }) => `${disabledColor}`};
    }
  }
`;

type TextAreaProps = {
  id?: string;
  placeholder?: string;
  style?: {
    layoutType?: 'line' | 'rounded';
    color?: string;
    backgroundColor?: string;
    disabledColor: string;
    disabledBackgroundColor: string;
    width?: string;
  };
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  disabled?: boolean;
  debounceWait?: number;

  rows?: number;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      placeholder = undefined,
      style: {
        layoutType = 'rounded',
        color = 'inherit',
        backgroundColor = 'inherit',
        disabledColor = 'gray',
        disabledBackgroundColor = 'rgba(128, 128, 128, 0.2)',
        width = 'inherit',
      } = {},
      value,
      defaultValue,
      onChange,
      onBlur,
      minLength = undefined,
      maxLength = undefined,
      required = false,
      disabled = false,
      debounceWait = undefined,
      rows = undefined,
    },
    ref,
  ) => {
    return (
      <Container
        ref={ref}
        id={id}
        placeholder={placeholder}
        layoutType={layoutType}
        color={color}
        backgroundColor={backgroundColor}
        disabledColor={disabledColor}
        disabledBackgroundColor={disabledBackgroundColor}
        width={width}
        value={value}
        defaultValue={defaultValue}
        onChange={debounceWait && onChange ? debounce(onChange, debounceWait) : onChange}
        onBlur={onBlur}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        aria-multiline='true'
        rows={rows}
      />
    );
  },
);
TextArea.displayName = 'textarea';

export { TextArea, type TextAreaProps };
