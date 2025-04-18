import { FocusEventHandler, forwardRef, useEffect, useMemo, useState } from 'react';

import debounce from 'debounce';
import { FaAngleDown, FaAngleUp, FaXmark } from 'react-icons/fa6';
import ReactSelect, {
  ActionMeta,
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
  theme?: {
    layoutType?: 'line' | 'rounded';
    color?: string;
    backgroundColor?: string;
    disabledColor?: string;
    disabledBackgroundColor?: string;
    selectedItemColor?: string;
    disabledItemColor?: string;
    width?: string;
  };
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[] | undefined, actionMeta: ActionMeta<Option>) => void;
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
      theme: {
        layoutType = 'rounded',
        color = 'inherit',
        backgroundColor = 'white',
        disabledColor = 'gray',
        disabledBackgroundColor = 'rgba(128, 128, 128, 0.2)',
        selectedItemColor = 'blue', //TODO maybe add a selected indicator icon? and use inherit too?
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
    if (backgroundColor === 'inherit') {
      throw new Error('backgroundColor cannot be "inherit"');
    }

    const [menuPlacementInternal, setMenuPlacementInternal] = useState<CoercedMenuPlacement>(
      menuPlacement === 'auto' ? 'bottom' : menuPlacement,
    );

    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
      if (value !== undefined) {
        setLocalValue(value);
      }
    }, [value]);

    const debouncedOnChange = useMemo(() => {
      function appliedOnChange(newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) {
        onChange?.(getOnChangeValue(newValue), actionMeta);
      }
      return debounceWait ? debounce(appliedOnChange, debounceWait) : appliedOnChange;
    }, [onChange, debounceWait]);

    function handleChange(newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) {
      setLocalValue(getOnChangeValue(newValue));
      debouncedOnChange?.(newValue, actionMeta);
    }

    console.log(layoutType);

    return (
      <ReactSelect
        ref={ref}
        id={id}
        placeholder={placeholder}
        noOptionsMessage={() => noOptionsMessage}
        components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
        styles={{
          control: (styles, { menuIsOpen, isDisabled }) => ({
            ...styles,
            color: isDisabled ? disabledColor : color,
            backgroundColor: isDisabled ? disabledBackgroundColor : backgroundColor,
            borderColor: isDisabled ? disabledColor : color,
            borderStyle: 'solid',
            borderTopWidth: layoutType === 'line' ? '0px' : '1px',
            borderRightWidth: layoutType === 'line' ? '0px' : '1px',
            borderBottomWidth: '1px',
            borderLeftWidth: layoutType === 'line' ? '0px' : '1px',
            borderTopLeftRadius:
              (!menuIsOpen || menuPlacementInternal === 'bottom') && layoutType === 'rounded' ? '12px' : '0px',
            borderTopRightRadius:
              (!menuIsOpen || menuPlacementInternal === 'bottom') && layoutType === 'rounded' ? '12px' : '0px',
            borderBottomLeftRadius:
              (!menuIsOpen || menuPlacementInternal === 'top') && layoutType === 'rounded' ? '12px' : '0px',
            borderBottomRightRadius:
              (!menuIsOpen || menuPlacementInternal === 'top') && layoutType === 'rounded' ? '12px' : '0px',
            width: width,
            boxShadow: 'none',
            pointerEvents: 'auto',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            ':hover': {
              ...styles[':hover'],
              borderColor: isDisabled ? disabledColor : color,
            },
            minHeight: '24px',
            height: '24px',
          }),
          valueContainer: (styles) => ({
            ...styles,
            height: '22px',
            padding: '0px 4px 0px 8px',
            paddingLeft: '8px',
          }),
          input: (styles, { isDisabled }) => ({
            ...styles,
            height: '22px',
            padding: '0px',
            margin: '0px',
            color: isDisabled ? disabledColor : color,
          }),
          placeholder: (styles, { isDisabled }) => ({
            ...styles,
            color: isDisabled ? disabledColor : color,
            fontSize: '16px',
            fontWeight: '700',
            margin: '0px',
          }),
          singleValue: (styles, { isDisabled }) => ({
            ...styles,
            color: isDisabled ? disabledColor : color,
            fontSize: '16px',
            fontWeight: '700',
            margin: '0px',
          }),
          menu: (styles, { placement }) => {
            setTimeout(() => setMenuPlacementInternal(placement), 0);
            return {
              ...styles,
              backgroundColor,
              borderColor: color,
              borderStyle: 'solid',
              borderWidth: '1px',
              borderTopLeftRadius: placement === 'top' ? '12px' : '0px',
              borderTopRightRadius: placement === 'top' ? '12px' : '0px',
              borderBottomLeftRadius: placement === 'top' ? '0px' : '12px',
              borderBottomRightRadius: placement === 'top' ? '0px' : '12px',
              maxWidth: width,
              margin: '0px',
              padding: '0px',
              top: '23px',
            };
          },
          menuList: (styles) => ({
            ...styles,
            //margin: '0px,
            padding: '0px',
          }),
          groupHeading: (styles) => ({
            ...styles,
            color: color,
          }),
          group: (styles) => ({
            ...styles,
            borderBottomColor: color,
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            ':last-of-type': {
              borderBottom: '0px',
            },
          }),
          option: (styles, { isSelected, isDisabled }) => ({
            ...styles,
            backgroundColor,
            color: isSelected ? selectedItemColor : isDisabled ? disabledItemColor : color,
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            ':active': {
              ...styles[':active'],
              backgroundColor,
            },
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: '700',
            margin: '0px 6px',
            padding: '2px 6px',
            borderBottomColor: color,
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            ':last-of-type': {
              borderBottom: '0px',
            },
            width: 'calc(100% - 12px)',
          }),
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
            padding: '2px 8px 0px 0px',
            paddingRight: '8px',
            ':hover': {
              ...styles[':hover'],
              color: isDisabled ? disabledColor : color,
            },
          }),
          clearIndicator: (styles) => ({
            ...styles,
            color: color,
            padding: '0px 4px 0px 0px',
            ':hover': {
              ...styles[':hover'],
              color: color,
            },
          }),
        }}
        value={getValue(options, localValue)}
        defaultValue={getValue(options, defaultValue)}
        onChange={handleChange}
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
