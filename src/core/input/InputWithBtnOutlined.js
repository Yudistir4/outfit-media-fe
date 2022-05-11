import React from "react";
import { Controller } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

const InputWithBtnOutlined = ({ name, control, button, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <FormControl sx={{ width: "100%" }} variant="standard" size="small">
          <InputLabel htmlFor="outlined-adornment-password">
            {props.label}
          </InputLabel>
          <Input
            size="small"
            {...props}
            inputRef={ref}
            value={value}
            onChange={onChange}
            endAdornment={
              <InputAdornment position="end">{button}</InputAdornment>
            }
            label={props.label}
          />
        </FormControl>
      )}
    />
  );
};

export default InputWithBtnOutlined;
