import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

type DatePickerProps = {
  label: string;
  value?: Date;
  onChange: (date: Date | null) => void;
};

export default function DatePicker({
  label,
  value,
  onChange,
}: DatePickerProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [date, setDate] = React.useState<any>(null);

  React.useEffect(() => {
    if (value) {
      const date = dayjs()
        .set("year", value.getFullYear())
        .set("month", value.getMonth())
        .set("date", value.getDate());
      setDate(dayjs(date));
    }
  }, [value]);

  const dateChanged = (value: Date | undefined | null) => {
    if (value) {
      const newDate = new Date(value);
      onChange(newDate);
      setDate(
        dayjs()
          .set("year", newDate.getFullYear())
          .set("month", newDate.getMonth())
          .set("date", newDate.getDate()),
      );
    } else {
      setDate(null);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MUIDatePicker
        value={date}
        label={label}
        onChange={dateChanged}
        slotProps={{
          textField: { variant: "standard", sx: { width: "130px" } },
        }}
      />
    </LocalizationProvider>
  );
}
