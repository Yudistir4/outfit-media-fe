import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";

function Input({ name, control, options, label, ...props }) {
  console.log("input");
  const configRadioGroup = {
    ...props,
    //  size: "small",
    //  InputLabelProps: otherProps.type === "date" ? { shrink: true } : null,
    //  fullWidth: true,
    //  variant: otherProps.variant ? otherProps.variant : "outlined",
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ref },
        fieldState: { error },
        formState,
      }) => (
        <FormControl fullWidth>
          <FormLabel id="demo-controlled-radio-buttons-group">
            {label}
          </FormLabel>
          <RadioGroup
            {...configRadioGroup}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name={name}
            value={value}
            onChange={onChange}
          >
            {options.map((item) => (
              <FormControlLabel
                value={item.value}
                control={<Radio />}
                label={item.label}
                key={item.value}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
}

export default Input;
