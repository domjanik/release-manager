import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

type DatePickerProps = {
  label: string;
  onChange: (date: Date | null) => void;
};

export default function DatePicker({
  label,
  onChange,
}: DatePickerProps): JSX.Element {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MUIDatePicker
        label={label}
        onChange={onChange}
        slotProps={{
          textField: { variant: "standard", sx: { width: "130px" } },
        }}
      />
    </LocalizationProvider>
  );
}
