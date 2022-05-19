import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Controller } from "react-hook-form";

export default function BasicDateTimePicker({ name, control, ...othersProps }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        // fieldState: { error },
        // formState,
      }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} {...othersProps} />}
            label={othersProps.label || "DateTimePicker"}
            value={value}
            onChange={(newValue) => onChange(newValue)}
          />
        </LocalizationProvider>
      )}
    />
  );
}
