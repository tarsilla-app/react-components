import { FocusEventHandler, forwardRef, useState } from 'react';

import debounce from 'debounce';
import { FaAngleDown, FaAngleUp, FaXmark } from 'react-icons/fa6';
import ReactSelect, {
  ClearIndicatorProps,
  CoercedMenuPlacement,
  components,
  DropdownIndicatorProps,
  MenuPlacement,
  MultiValueRemoveProps,
  OnChangeValue,
  SelectInstance,
} from 'react-select';

export type SingleOption = {
  label: string;
  value: string;
  isDisabled?: boolean;
};

export type GroupOption = {
  label: string;
  options: {
    label: string;
    value: string;
    isDisabled?: boolean;
  }[];
};

export type Option = SingleOption | GroupOption;

export type IsMulti = boolean;

function getValue(options?: Option[], value?: string | string[]): SingleOption | SingleOption[] | undefined {
  if (options && value) {
    if (Array.isArray(value)) {
      //multiple
      const result: SingleOption[] = [];
      options.forEach((option) => {
        if ('value' in option && value.includes(option.value)) {
          result.push(option);
        } else if ('options' in option) {
          const founds = option.options.filter((option) => value.includes(option.value));
          founds.forEach((found) => {
            result.push(found);
          });
        }
      });
      return result;
    } else {
      // single
      for (const option of options) {
        if ('value' in option && option.value === value) {
          return option;
        } else if ('options' in option) {
          return option.options.find((option) => option.value === value);
        }
      }
    }
  }
  return undefined;
}

function getOnChangeValue(newValues?: OnChangeValue<Option, IsMulti>): string | string[] | undefined {
  if (newValues) {
    if (Array.isArray(newValues)) {
      //multiple
      const result: string[] = [];
      newValues.forEach((newValue: Option) => {
        if ('value' in newValue) {
          result.push(newValue.value.toString());
        } else if ('options' in newValue) {
          newValue.options.forEach((option) => {
            result.push(option.value.toString());
          });
        }
      });
      return result;
    } else {
      // single
      if ('value' in newValues) {
        return newValues.value.toString();
      } else if ('options' in newValues) {
        return newValues.options[0].value.toString();
      }
    }
  }
  return undefined;
}

function DropdownIndicator(props: DropdownIndicatorProps<Option>) {
  return (
    <components.DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? <FaAngleUp size={16} /> : <FaAngleDown size={16} />}
    </components.DropdownIndicator>
  );
}

function ClearIndicator(props: ClearIndicatorProps<Option>) {
  return (
    <components.ClearIndicator {...props}>
      <FaXmark size={16} />
    </components.ClearIndicator>
  );
}

function MultiValueRemove(props: MultiValueRemoveProps<Option>) {
  return (
    <components.MultiValueRemove {...props}>
      <FaXmark size={16} />
    </components.MultiValueRemove>
  );
}

type SelectProps<Option> = {
  id?: string;
  placeholder?: string;
  noOptionsMessage?: string;
  style?: {
    layoutType?: 'line' | 'rounded';
    color?: string;
    backgroundColor?: string;
    disabledBackgroundColor?: string;
    disabledColor?: string;
    selectedItemColor?: string;
    disabledItemColor?: string;
    width?: string;
  };
  value?: string | string[];
  defaultValue?: string | string[];
  onChange: (value?: string | string[]) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  required?: boolean;
  disabled?: boolean;
  debounceWait?: number;
  options?: Option[];
  isSearchable?: boolean;
  isMulti?: boolean;
  menuPlacement?: MenuPlacement;
};

const Select = forwardRef<SelectInstance<Option>, SelectProps<Option>>(
  (
    {
      id,
      placeholder = 'Select',
      noOptionsMessage = 'No options',
      style: {
        layoutType = 'rounded',
        color = 'black',
        backgroundColor = 'white',
        disabledColor = 'gray',
        disabledBackgroundColor = 'rgba(128, 128, 128, 0.2)',
        selectedItemColor = 'blue',
        disabledItemColor = 'gray',
        width = 'inherit',
      } = {},
      value,
      defaultValue,
      onChange,
      onBlur,
      required = false,
      disabled = false,
      debounceWait = undefined,
      options,
      isMulti = false,
      isSearchable = false,
      menuPlacement = 'bottom',
    },
    ref,
  ) => {
    const [menuPlacementInternal, setMenuPlacementInternal] = useState<CoercedMenuPlacement>(
      menuPlacement === 'auto' ? 'bottom' : menuPlacement,
    );

    function appliedOnChange(newValue: OnChangeValue<Option, IsMulti>) {
      onChange(getOnChangeValue(newValue));
    }
    return (
      <ReactSelect
        ref={ref}
        id={id}
        placeholder={placeholder}
        noOptionsMessage={() => noOptionsMessage}
        components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
        styles={{
          control: (styles, { menuIsOpen, isDisabled }) => {
            return {
              ...styles,
              backgroundColor: isDisabled ? disabledBackgroundColor : backgroundColor,
              border: layoutType === 'line' ? '0px' : `1px solid ${isDisabled ? disabledColor : color}`,
              borderBottom: `1px solid ${isDisabled ? disabledColor : color}`,
              borderTopLeftRadius:
                (!menuIsOpen || menuPlacementInternal === 'bottom') && layoutType === 'rounded' ? '12px' : '0',
              borderTopRightRadius:
                (!menuIsOpen || menuPlacementInternal === 'bottom') && layoutType === 'rounded' ? '12px' : '0',
              borderBottomLeftRadius:
                (!menuIsOpen || menuPlacementInternal === 'top') && layoutType === 'rounded' ? '12px' : '0',
              borderBottomRightRadius:
                (!menuIsOpen || menuPlacementInternal === 'top') && layoutType === 'rounded' ? '12px' : '0',
              width: width,
              boxShadow: 'none',
              cursor: 'pointer',
              ':hover': {
                ...styles[':hover'],
                borderColor: isDisabled ? disabledColor : color,
              },
              minHeight: '24px',
              height: '24px',
            };
          },
          valueContainer: (styles) => ({
            ...styles,
            height: '22px',
            padding: '0 4px 0 8px',
            paddingLeft: layoutType === 'line' ? '0' : undefined,
          }),
          input: (styles, { isDisabled }) => ({
            ...styles,
            height: '22px',
            padding: '0',
            margin: '0',
            color: isDisabled ? disabledColor : color,
          }),
          placeholder: (styles, { isDisabled }) => ({
            ...styles,
            color: isDisabled ? disabledColor : color,
            fontSize: '16px',
            fontWeight: '700',
            margin: 0,
          }),
          singleValue: (styles, { isDisabled }) => ({
            ...styles,
            color: isDisabled ? disabledColor : color,
            fontSize: '16px',
            fontWeight: '700',
            margin: 0,
          }),
          menu: (styles, { placement }) => {
            setTimeout(() => setMenuPlacementInternal(placement), 0);
            return {
              ...styles,
              backgroundColor: backgroundColor,
              border: `1px solid ${color}`,
              borderTopLeftRadius: placement === 'top' ? '12px' : '0',
              borderTopRightRadius: placement === 'top' ? '12px' : '0',
              borderBottomLeftRadius: placement === 'top' ? '0' : '12px',
              borderBottomRightRadius: placement === 'top' ? '0' : '12px',
              maxWidth: width,
              margin: 0,
              //padding: 0,
            };
          },
          menuList: (styles) => ({
            ...styles,
            //margin: 0,
            padding: 0,
          }),
          groupHeading: (styles) => ({
            ...styles,
            color: color,
          }),
          group: (styles) => ({
            ...styles,
            borderBottom: `1px solid ${color}`,
            ':last-of-type': {
              borderBottom: 0,
            },
          }),
          option: (styles, { isSelected, isDisabled }) => {
            return {
              ...styles,
              backgroundColor: 'transparent',
              color: isSelected ? selectedItemColor : isDisabled ? disabledItemColor : color,
              cursor: isDisabled ? 'default' : 'pointer',
              ':active': {
                ...styles[':active'],
                backgroundColor: 'transparent',
              },
              fontSize: '16px',
              lineHeight: '20px',
              fontWeight: '700',
              margin: '0 6px',
              padding: '2px 6px',
              borderBottom: `1px solid ${color}`,
              ':last-of-type': {
                borderBottom: 0,
              },
              width: 'calc(100% - 12px)',
            };
          },
          indicatorSeparator: (styles) => ({
            ...styles,
            display: 'none',
          }),
          indicatorsContainer: (styles) => ({
            ...styles,
            height: '22px',
          }),
          dropdownIndicator: (styles, { isDisabled }) => ({
            ...styles,
            color: isDisabled ? disabledColor : color,
            padding: '2px 8px 0 0',
            paddingRight: layoutType === 'line' ? '0' : undefined,
            ':hover': {
              ...styles[':hover'],
              color: isDisabled ? disabledColor : color,
            },
          }),
          clearIndicator: (styles) => ({
            ...styles,
            color: color,
            padding: '0 4px 0 0',
            ':hover': {
              ...styles[':hover'],
              color: color,
            },
          }),
        }}
        value={getValue(options, value)}
        defaultValue={getValue(options, defaultValue)}
        onChange={debounceWait ? debounce(appliedOnChange, debounceWait) : appliedOnChange}
        onBlur={onBlur}
        required={required}
        isDisabled={disabled}
        options={options}
        isMulti={isMulti}
        isSearchable={isSearchable}
        controlShouldRenderValue={!isMulti}
        hideSelectedOptions={false}
        closeMenuOnSelect={!isMulti}
        menuPlacement={menuPlacement}
        isClearable={true}
      />
    );
  },
);
Select.displayName = 'select';

export { Select, type SelectProps };
