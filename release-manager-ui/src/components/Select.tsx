import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
} from "@mui/material";
import React, { useState } from "react";

type CustomSelectProps = {
  options: string[];
  allOptionLabel?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
};

export function Select({
  options,
  onChange,
  allOptionLabel,
  value = "all",
  ...props
}: CustomSelectProps): JSX.Element {
  const changedValue = (value: string) => {
    onChange(value);
  };

  return (
    <FormControl>
      {props.placeholder ? (
        <InputLabel id="select-label">{props.placeholder}</InputLabel>
      ) : (
        <></>
      )}
      <MUISelect
        variant="standard"
        value={value}
        labelId="select-label"
        onChange={(ev) => changedValue(ev.target.value as string)}
        sx={{ minWidth: "100px" }}
        {...props}
      >
        <MenuItem value="all">{allOptionLabel}</MenuItem>
        {options?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
}
