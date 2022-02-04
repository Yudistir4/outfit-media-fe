import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

function Input({ name, control, ...otherProps }) {
  console.log("input");
  const configTextField = {
    ...otherProps,
    size: "small",
    InputLabelProps: otherProps.type === "date" ? { shrink: true } : null,
    // fullWidth: true,
    variant: "outlined",
  };
  //   console.log(otherProps);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          {...configTextField}
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
        />
      )}
    />
  );
}

export default Input;
