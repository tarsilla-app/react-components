import debounce from 'debounce';
import { FocusEventHandler, useMemo, useState } from 'react';
import { FaAngleDown, FaAngleUp, FaXmark } from 'react-icons/fa6';
import ReactSelect, {
  ActionMeta,
  ClearIndicatorProps,
  CoercedMenuPlacement,
  components,
  DropdownIndicatorProps,
  GroupBase,
  MenuPlacement,
  OnChangeValue,
  SelectInstance,
} from 'react-select';

export type GroupOption = GroupBase<SingleOption>;

export type IsMulti = boolean;

export type Option = GroupOption | SingleOption;

export type SingleOption = {
  isDisabled?: boolean;
  label: string;
  value: string;
};

type SelectProps<Option> = {
  debounceWait?: number;
  defaultValue?: string | string[];
  disabled?: boolean;
  id?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  menuPlacement?: MenuPlacement;
  noOptionsMessage?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: (value: string | string[] | undefined, actionMeta: ActionMeta<SingleOption>) => void;
  options?: Option[];
  placeholder?: string;
  required?: boolean;
  theme?: {
    backgroundColor?: string;
    color?: string;
    disabledBackgroundColor?: string;
    disabledColor?: string;
    disabledItemColor?: string;
    layoutType?: 'line' | 'rounded';
    selectedItemColor?: string;
    width?: string;
  };
  value?: string | string[];
};

function ClearIndicator(props: ClearIndicatorProps<SingleOption, IsMulti, GroupOption>) {
  return (
    <components.ClearIndicator {...props}>
      <FaXmark size={16} />
    </components.ClearIndicator>
  );
}

function DropdownIndicator({ selectProps, ...rest }: DropdownIndicatorProps<SingleOption, IsMulti, GroupOption>) {
  return (
    <components.DropdownIndicator selectProps={selectProps} {...rest}>
      {selectProps.menuIsOpen ? <FaAngleUp size={16} /> : <FaAngleDown size={16} />}
    </components.DropdownIndicator>
  );
}

function getOnChangeValue(newValues?: OnChangeValue<SingleOption, IsMulti>): string | string[] | undefined {
  if (newValues) {
    if (Array.isArray(newValues)) {
      //multiple
      return (newValues as SingleOption[]).map((newValue) => newValue.value);
    } else {
      // single
      return (newValues as SingleOption).value;
    }
  }
  return undefined;
}

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

const DEFAULT_THEME: NonNullable<SelectProps<Option>['theme']> = {};

const Select = ({
  debounceWait,
  defaultValue,
  disabled = false,
  id,
  isMulti = false,
  isSearchable = false,
  menuPlacement = 'bottom',
  noOptionsMessage = 'No options',
  onBlur,
  onChange,
  options,
  placeholder = 'Select',
  ref,
  required = false,
  theme: {
    backgroundColor = 'white',
    color = 'inherit',
    disabledBackgroundColor = 'rgba(128, 128, 128, 0.2)',
    disabledColor = 'gray',
    disabledItemColor = 'gray',
    layoutType = 'rounded',
    selectedItemColor = 'blue', //TODO maybe add a selected indicator icon? and use inherit too?
    width = 'inherit',
  } = DEFAULT_THEME,
  value,
}: { ref?: React.RefObject<SelectInstance<SingleOption, IsMulti, GroupOption> | null> } & SelectProps<Option>) => {
  if (backgroundColor === 'inherit') {
    throw new Error('backgroundColor cannot be "inherit"');
  }

  const [menuPlacementInternal, setMenuPlacementInternal] = useState<CoercedMenuPlacement>(
    menuPlacement === 'auto' ? 'bottom' : menuPlacement,
  );

  const [localValue, setLocalValue] = useState(value);
  const [prevPropValue, setPrevPropValue] = useState(value);

  if (prevPropValue !== value) {
    setPrevPropValue(value);
    if (value !== undefined) {
      setLocalValue(value);
    }
  }

  const debouncedOnChange = useMemo(() => {
    function appliedOnChange(newValue: OnChangeValue<SingleOption, IsMulti>, actionMeta: ActionMeta<SingleOption>) {
      onChange?.(getOnChangeValue(newValue), actionMeta);
    }
    return debounceWait != null && debounceWait > 0 ? debounce(appliedOnChange, debounceWait) : appliedOnChange;
  }, [onChange, debounceWait]);

  function handleChange(newValue: OnChangeValue<SingleOption, IsMulti>, actionMeta: ActionMeta<SingleOption>) {
    setLocalValue(getOnChangeValue(newValue));
    debouncedOnChange(newValue, actionMeta);
  }

  return (
    <ReactSelect<SingleOption, IsMulti, GroupOption>
      closeMenuOnSelect={!isMulti}
      components={{ ClearIndicator, DropdownIndicator }}
      controlShouldRenderValue={!isMulti}
      defaultValue={getValue(options, defaultValue)}
      hideSelectedOptions={false}
      id={id}
      isClearable={true}
      isDisabled={disabled}
      isMulti={isMulti}
      isSearchable={isSearchable}
      menuPlacement={menuPlacement}
      noOptionsMessage={() => noOptionsMessage}
      onBlur={onBlur}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      ref={ref}
      required={required}
      styles={{
        clearIndicator: (styles) => ({
          ...styles,
          color: color,
          ':hover': {
            ...styles[':hover'],
            color: color,
          },
          padding: '0px 4px 0px 0px',
        }),
        control: (styles, { isDisabled, menuIsOpen }) => ({
          ...styles,
          backgroundColor: isDisabled ? disabledBackgroundColor : backgroundColor,
          borderBottomLeftRadius:
            (!menuIsOpen || menuPlacementInternal === 'top') && layoutType === 'rounded' ? '12px' : '0px',
          borderBottomRightRadius:
            (!menuIsOpen || menuPlacementInternal === 'top') && layoutType === 'rounded' ? '12px' : '0px',
          borderBottomWidth: '1px',
          borderColor: isDisabled ? disabledColor : color,
          borderLeftWidth: layoutType === 'line' ? '0px' : '1px',
          borderRightWidth: layoutType === 'line' ? '0px' : '1px',
          borderStyle: 'solid',
          borderTopLeftRadius:
            (!menuIsOpen || menuPlacementInternal === 'bottom') && layoutType === 'rounded' ? '12px' : '0px',
          borderTopRightRadius:
            (!menuIsOpen || menuPlacementInternal === 'bottom') && layoutType === 'rounded' ? '12px' : '0px',
          borderTopWidth: layoutType === 'line' ? '0px' : '1px',
          boxShadow: 'none',
          color: isDisabled ? disabledColor : color,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          height: '24px',
          ':hover': {
            ...styles[':hover'],
            borderColor: isDisabled ? disabledColor : color,
          },
          minHeight: '24px',
          pointerEvents: 'auto',
          width: width,
        }),
        dropdownIndicator: (styles, { isDisabled }) => ({
          ...styles,
          color: isDisabled ? disabledColor : color,
          ':hover': {
            ...styles[':hover'],
            color: isDisabled ? disabledColor : color,
          },
          padding: '2px 8px 0px 0px',
          paddingRight: '8px',
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
        groupHeading: (styles) => ({
          ...styles,
          color: color,
        }),
        indicatorsContainer: (styles) => ({
          ...styles,
          height: '22px',
        }),
        indicatorSeparator: (styles) => ({
          ...styles,
          display: 'none',
        }),
        input: (styles, { isDisabled }) => ({
          ...styles,
          color: isDisabled ? disabledColor : color,
          height: '22px',
          margin: '0px',
          padding: '0px',
        }),
        menu: (styles, { placement }) => {
          setTimeout(() => {
            setMenuPlacementInternal(placement);
          }, 0);
          return {
            ...styles,
            backgroundColor,
            borderBottomLeftRadius: placement === 'top' ? '0px' : '12px',
            borderBottomRightRadius: placement === 'top' ? '0px' : '12px',
            borderColor: color,
            borderStyle: 'solid',
            borderTopLeftRadius: placement === 'top' ? '12px' : '0px',
            borderTopRightRadius: placement === 'top' ? '12px' : '0px',
            borderWidth: '1px',
            margin: '0px',
            maxWidth: width,
            padding: '0px',
            top: '23px',
          };
        },
        menuList: (styles) => ({
          ...styles,
          //margin: '0px,
          padding: '0px',
        }),
        option: (styles, { isDisabled, isSelected }) => ({
          ...styles,
          ':active': {
            ...styles[':active'],
            backgroundColor,
          },
          backgroundColor,
          borderBottomColor: color,
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          color: isSelected ? selectedItemColor : isDisabled ? disabledItemColor : color,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: '700',
          ':last-of-type': {
            borderBottom: '0px',
          },
          lineHeight: '20px',
          margin: '0px 6px',
          padding: '2px 6px',
          width: 'calc(100% - 12px)',
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
        valueContainer: (styles) => ({
          ...styles,
          height: '22px',
          padding: '0px 4px 0px 8px',
          paddingLeft: '8px',
        }),
      }}
      value={getValue(options, localValue)}
    />
  );
};
Select.displayName = 'select';

export { Select, type SelectProps };
