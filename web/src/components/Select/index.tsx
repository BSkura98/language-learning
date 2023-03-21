import React, { memo } from 'react';
import { FormControl, InputLabel, MenuItem, Select as MuiSelect, type SelectProps } from '@mui/material';

type Value = string | number | readonly string[] | undefined;

interface MenuItemValue {
  value: Value;
  label: string;
}

interface Props extends SelectProps {
  menuItemsValues: MenuItemValue[];
  fullWidth?: boolean;
  size?: 'small' | 'medium' | undefined;
  label?: string;
  id: string;
}

export const Select = memo(({ menuItemsValues, fullWidth, size, label, id, ...props }: Props): JSX.Element => {
  const renderMenuItems = (): JSX.Element[] =>
    menuItemsValues.map((menuItemValue: MenuItemValue) => (
      <MenuItem value={menuItemValue.value} key={menuItemValue.value?.toString()}>
        {menuItemValue.label}
      </MenuItem>
    ));

  return (
    <FormControl fullWidth={fullWidth} size={size}>
      <InputLabel id={id.concat('-label')}>{label}</InputLabel>
      <MuiSelect id={id} labelId={id.concat('-label')} label={label} {...props}>
        {renderMenuItems()}
      </MuiSelect>
    </FormControl>
  );
});
