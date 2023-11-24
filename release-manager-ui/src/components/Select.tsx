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
  onChange: (value: string) => void;
};

export function Select({
  options,
  onChange,
  allOptionLabel,
  ...props
}: CustomSelectProps): JSX.Element {
  const [project, setProject] = useState<string>("all");

  const changedProject = (value: string) => {
    setProject(value);
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
        value={project}
        labelId="select-label"
        onChange={(ev) => changedProject(ev.target.value as string)}
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
