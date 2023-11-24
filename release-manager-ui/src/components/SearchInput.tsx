import { FormControl, InputLabel, TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDebounce } from "../utils/debounce";

type SearchInputProps = {
  onChange: (value: string) => void;
};

export function SearchInput(props: SearchInputProps): JSX.Element {
  const debouncedOnChange = useDebounce<string>(props.onChange);

  const changedValue = (value: string) => {
    debouncedOnChange(value);
  };

  return (
    <FormControl>
      <TextField
        label="Search phrase"
        variant="standard"
        sx={{ minWidth: "100px" }}
        onChange={(ev: ChangeEvent<HTMLInputElement>) => {
          changedValue(ev.target.value);
        }}
      />
    </FormControl>
  );
}
