import { forwardRef, useState } from 'react';

import debounce from 'debounce';
import { FaAngleDown, FaAngleUp, FaXmark } from 'react-icons/fa6';
import ReactSelect, {
  ClearIndicatorProps,
  CoercedMenuPlacement,
  components,
  DropdownIndicatorProps,
  MenuPlacement,
  SelectInstance,
} from 'react-select';

//TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Handler = (...event: any[]) => void;

export type SingleOption = {
  label: string;
  value: string;
};

export type GroupOption = {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
};

export type Option = SingleOption | GroupOption;

function getValue(options?: Option[], value?: string | string[]): SingleOption | SingleOption[] | undefined {
  if (options && value) {
    if (Array.isArray(value)) {
      //multiple
      const result: SingleOption[] = [];
      options.forEach((option) => {
        if ('value' in option && value.includes(option.value)) {
          result.push(option);
        } else if ('options' in option) {
          const found = option.options.filter((option) => value.includes(option.value));
          result.concat(found);
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

type Props = {
  id?: string;
  placeholder?: string;
  style?: {
    layoutType?: 'line' | 'rounded';
    color?: string;
    selectedColor?: string;
    backgroundColor?: string;
    width?: string;
  };
  value?: string | string[];
  defaultValue?: string | string[];
  onChange: Handler;
  required?: boolean;
  disabled?: boolean;
  debounceWait?: number;
  options?: Option[];
  isMulti?: boolean;
  menuPlacement?: MenuPlacement;
};

const defaultStyle = {
  layoutType: 'rounded',
  color: 'black',
  selectedColor: 'gray',
  backgroundColor: 'inherit',
  width: 'inherit',
};
const Select = forwardRef<SelectInstance<Option>, Props>(
  (
    {
      id,
      placeholder = 'Select',
      style,
      value,
      defaultValue,
      onChange,
      required = false,
      disabled = false,
      debounceWait = undefined,
      options,
      isMulti = false,
      menuPlacement = 'bottom',
    },
    ref,
  ) => {
    const appliedStyle = { ...defaultStyle, ...style };
    const [menuPlacementInternal, setMenuPlacementInternal] = useState<CoercedMenuPlacement>(
      menuPlacement === 'auto' ? 'bottom' : menuPlacement,
    );
    //TODO disabled colors
    //TODO allow unselect
    //TODO translator
    return (
      <ReactSelect
        id={id}
        ref={ref}
        placeholder={placeholder}
        components={{ DropdownIndicator, ClearIndicator }}
        styles={{
          control: (styles, { menuIsOpen }) => {
            return {
              ...styles,
              backgroundColor: appliedStyle.backgroundColor,
              border: appliedStyle.layoutType === 'line' ? '0px' : `1px solid ${appliedStyle.color}`,
              borderBottom: `1px solid ${appliedStyle.color}`,
              borderTopLeftRadius:
                (!menuIsOpen || menuPlacementInternal === 'bottom') && appliedStyle.layoutType === 'rounded'
                  ? '12px'
                  : '0',
              borderTopRightRadius:
                (!menuIsOpen || menuPlacementInternal === 'bottom') && appliedStyle.layoutType === 'rounded'
                  ? '12px'
                  : '0',
              borderBottomLeftRadius:
                (!menuIsOpen || menuPlacementInternal === 'top') && appliedStyle.layoutType === 'rounded'
                  ? '12px'
                  : '0',
              borderBottomRightRadius:
                (!menuIsOpen || menuPlacementInternal === 'top') && appliedStyle.layoutType === 'rounded'
                  ? '12px'
                  : '0',
              width: appliedStyle.width,
              boxShadow: 'none',
              cursor: 'pointer',
              ':hover': {
                ...styles[':hover'],
                borderColor: appliedStyle.color,
              },
              minHeight: '24px',
              height: '24px',
            };
          },
          valueContainer: (styles) => ({
            ...styles,
            height: '22px',
            padding: '0 4px 0 8px',
            paddingLeft: appliedStyle.layoutType === 'line' ? '0' : undefined,
          }),
          input: (styles) => ({
            ...styles,
            height: '22px',
            padding: '0',
            margin: '0',
            color: appliedStyle.color,
          }),
          placeholder: (styles) => ({
            ...styles,
            color: appliedStyle.color,
            fontSize: '16px',
            fontWeight: '700',
            margin: 0,
          }),
          singleValue: (styles) => ({
            ...styles,
            color: appliedStyle.color,
            fontSize: '16px',
            fontWeight: '700',
            margin: 0,
          }),
          menu: (styles, { placement }) => {
            setTimeout(() => setMenuPlacementInternal(placement), 0);
            return {
              ...styles,
              backgroundColor: appliedStyle.backgroundColor,
              border: `1px solid ${appliedStyle.color}`,
              borderTopLeftRadius: placement === 'top' ? '12px' : '0',
              borderTopRightRadius: placement === 'top' ? '12px' : '0',
              borderBottomLeftRadius: placement === 'top' ? '0' : '12px',
              borderBottomRightRadius: placement === 'top' ? '0' : '12px',
              maxWidth: appliedStyle.width,
              margin: '0',
            };
          },
          menuList: (styles) => ({
            ...styles,
            padding: 0,
          }),
          group: (styles) => ({
            ...styles,
            borderBottom: `1px solid ${appliedStyle.color}`,
            ':last-of-type': {
              borderBottom: 0,
            },
          }),
          option: (styles, { isSelected }) => {
            return {
              ...styles,
              backgroundColor: 'transparent',
              color: isSelected ? appliedStyle.selectedColor : appliedStyle.color,
              cursor: 'pointer',
              ':active': {
                ...styles[':active'],
                backgroundColor: 'transparent',
              },
              fontSize: '16px',
              lineHeight: '20px',
              fontWeight: '700',
              margin: '0 6px',
              padding: '2px 6px',
              borderBottom: `1px solid ${appliedStyle.color}`,
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
          dropdownIndicator: (styles) => ({
            ...styles,
            color: appliedStyle.color,
            padding: '2px 8px 0 0',
            paddingRight: appliedStyle.layoutType === 'line' ? '0' : undefined,
            ':hover': {
              ...styles[':hover'],
              color: appliedStyle.color,
            },
          }),
          clearIndicator: (styles) => ({
            ...styles,
            color: appliedStyle.color,
            padding: '0 4px 0 0',
            ':hover': {
              ...styles[':hover'],
              color: appliedStyle.color,
            },
          }),
        }}
        value={getValue(options, value)}
        defaultValue={getValue(options, defaultValue)}
        onChange={debounceWait ? debounce(onChange, debounceWait) : onChange}
        required={required}
        isDisabled={disabled}
        options={options}
        isMulti={isMulti}
        controlShouldRenderValue={!isMulti}
        hideSelectedOptions={false}
        closeMenuOnSelect={!isMulti}
        menuPlacement={menuPlacement}
        isSearchable={false} //TODO search
      />
    );
  },
);
Select.displayName = 'select';

export { Select, Props as SelectProps };
