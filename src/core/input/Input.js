import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import React from "react";

function Input({ name, control, currency, ...otherProps }) {
  // console.log("input");
  const configTextField = {
    ...otherProps,
    size: "small",
    InputLabelProps: otherProps.type === "date" ? { shrink: true } : null,
    // fullWidth: true,
    variant: otherProps.variant ? otherProps.variant : "outlined",
  };
  //   console.log(otherProps);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ref },
        fieldState: { error },
        // formState,
      }) => (
        <TextField
          {...configTextField}
          inputRef={ref}
          helperText={error ? error.message : null}
          error={!!error}
          onChange={(e) => {
            if (
              currency &&
              !e.target.value.match(/[^.\s\d]/g) &&
              e.target.value.length != 0
            ) {
              e.target.value = new Intl.NumberFormat("id-ID").format(
                e.target.value.replaceAll(".", "")
              );
            }

            onChange(e);
          }}
          value={
            currency && !value.match(/[^.\s\d]/g) && value.length != 0
              ? new Intl.NumberFormat("id-ID").format(value.replaceAll(".", ""))
              : value
          }
        />
      )}
    />
  );
}

export default Input;
