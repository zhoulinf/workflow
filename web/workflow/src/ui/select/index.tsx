import * as SelectPrimitive from '@radix-ui/react-select';
import type { SelectItemProps, SelectValueProps, SelectProps as BaseSelectProps } from '@radix-ui/react-select';

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';

import React from 'react';
import styles from './index.module.scss';

type SelectProps = SelectValueProps & BaseSelectProps &{
  options:Array<{
    value:string;
    label:string;
  }>
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <SelectPrimitive.Item
      className={`${styles['select-item']} ${className}`}
      {...props}
      ref={forwardedRef}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className={styles['select-item-indicator']}>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  ),
);

export const Select = (props:SelectProps) => {
  const { options, placeholder, ...restProps } = props;

  return (
    <SelectPrimitive.Root {...restProps}>
      <SelectPrimitive.Trigger className={styles.trigger}>
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className={styles['select-icon']}>
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className={styles['select-content']}>
          <SelectPrimitive.ScrollUpButton className={styles['select-scroll-button']}>
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className={styles['select-viewport']}>
            {
              options.map((item) => (
                <SelectItem value={item.value}>{item.label}</SelectItem>
              ))
            }
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton>
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};
