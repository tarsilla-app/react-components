import { forwardRef, useState } from 'react';

import debounce from 'debounce';
import { FaAngleDown, FaAngleUp, FaXmark } from 'react-icons/fa6';
import ReactSelect, {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MenuPlacement,
  SelectInstance,
  Props as SelectProps,
} from 'react-select';

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

const DropdownIndicator = (props: DropdownIndicatorProps<Option>) => {
  return (
    <components.DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? <FaAngleUp size={16} /> : <FaAngleDown size={16} />}
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props: ClearIndicatorProps<Option>) => {
  return (
    <components.ClearIndicator {...props}>
      <FaXmark size={16} />
    </components.ClearIndicator>
  );
};

type Props = {
  type?: 'line' | 'rounded';
  placeholder?: string;
  color?: string;
  selectedColor?: string;
  backgroundColor?: string;
  width?: string;

  options?: Option[];

  onChange: Exclude<SelectProps['onChange'], undefined>;
  value?: Option | Option[];

  isMulti?: boolean;
  controlShouldRenderValue?: boolean;
  hideSelectedOptions?: boolean;
  closeMenuOnSelect?: boolean;
  menuIsOpen?: boolean;
  menuPlacement?: MenuPlacement;
  debounceWait?: number;
};

const Select = forwardRef<SelectInstance<Option>, Props>(
  (
    {
      type = 'rounded',
      color = 'black',
      selectedColor,
      backgroundColor = 'inherit',
      width = 'inherit',
      menuPlacement = 'bottom',
      debounceWait,
      onChange,
      ...rest
    }: Props,
    ref,
  ) => {
    const [menuPlacementInternal, setMenuPlacementInternal] = useState(menuPlacement === 'auto' ? 'bottom' : menuPlacement);
    return (
      <ReactSelect
        components={{ DropdownIndicator, ClearIndicator }}
        styles={{
          control: (styles, props) => {
            return {
              ...styles,
              backgroundColor: backgroundColor,
              border: type === 'rounded' ? `1px solid ${color}` : '0px',
              borderBottom: `1px solid ${color}`,
              borderTopLeftRadius: (!props.menuIsOpen || menuPlacementInternal === 'bottom') && type === 'rounded' ? '12px' : '0',
              borderTopRightRadius: (!props.menuIsOpen || menuPlacementInternal === 'bottom') && type === 'rounded' ? '12px' : '0',
              borderBottomLeftRadius: (!props.menuIsOpen || menuPlacementInternal === 'top') && type === 'rounded' ? '12px' : '0',
              borderBottomRightRadius: (!props.menuIsOpen || menuPlacementInternal === 'top') && type === 'rounded' ? '12px' : '0',
              width: width,
              boxShadow: 'none',
              cursor: 'pointer',
              ':hover': {
                ...styles[':hover'],
                borderColor: color,
              },
              minHeight: '24px',
              height: '24px',
            };
          },
          valueContainer: (styles) => ({
            ...styles,
            height: '22px',
            padding: '0 4px 0 8px',
            paddingLeft: type === 'rounded' ? undefined : '0',
          }),
          input: (styles) => ({
            ...styles,
            height: '22px',
            padding: '0',
            margin: '0',
            color: color,
          }),
          placeholder: (styles) => ({ ...styles, color: color, fontSize: '16px', fontWeight: '700', margin: 0 }),
          singleValue: (styles) => ({ ...styles, color: color, fontSize: '16px', fontWeight: '700', margin: 0 }),
          menu: (styles, { placement }) => {
            setMenuPlacementInternal(placement);
            return {
              ...styles,
              backgroundColor: backgroundColor,
              border: `1px solid ${color}`,
              borderTopLeftRadius: placement === 'top' ? '12px' : '0',
              borderTopRightRadius: placement === 'top' ? '12px' : '0',
              borderBottomLeftRadius: placement === 'top' ? '0' : '12px',
              borderBottomRightRadius: placement === 'top' ? '0' : '12px',
              maxWidth: width,
              margin: '0',
            };
          },
          menuList: (styles) => ({
            ...styles,
            padding: 0,
          }),
          group: (styles) => ({
            ...styles,
            borderBottom: `1px solid ${color}`,
            ':last-of-type': {
              borderBottom: 0,
            },
          }),
          option: (styles, { isSelected }) => {
            return {
              ...styles,
              backgroundColor: 'transparent',
              color: isSelected ? selectedColor : color,
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
          dropdownIndicator: (styles) => ({
            ...styles,
            color: color,
            padding: '2px 8px 0 0',
            paddingRight: type === 'rounded' ? undefined : '0',
            ':hover': {
              ...styles[':hover'],
              color: color,
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
        ref={ref}
        onChange={debounceWait ? debounce(onChange, debounceWait) : onChange}
        menuPlacement={menuPlacement}
        isSearchable={false} //TODO search
        {...rest}
      />
    );
  },
);
Select.displayName = 'select';

export { Select };
