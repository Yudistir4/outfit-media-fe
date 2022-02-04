import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";

function MySelect({ name, control, ...props }) {
  const configFormControl = {
    fullWidth: props.fullWidth && true,
    variant: props.variant,
    size: "small",
    sx: props.sx,
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <FormControl {...configFormControl} error={error && true}>
          <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            // id="demo-simple-select"
            value={value}
            label={props.label}
            onChange={onChange}
          >
            {props.menu.map((e, index) => (
              <MenuItem value={e.value} key={index}>
                {e.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error ? error.message : null}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default MySelect;
