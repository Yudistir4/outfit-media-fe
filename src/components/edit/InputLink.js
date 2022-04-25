import { Controller } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import React from "react";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SearchProductByLink from "./SearchProductByLink";
import useDialog from "../../hooks/useDialog";

const InputLink = ({ name, control, setValue, setImage, urutanArray }) => {
  const { createDialog } = useDialog();

  const searchProduct = (link) => {
    console.log("Link L: ", link);
    createDialog({
      title: "Seacrh Product",
      contentWithButton: (
        <SearchProductByLink
          link={link}
          setValue={(value) => {
            console.log(value);
            value.name &&
              setValue(`products[${urutanArray}].productName`, value.name);
            value.price &&
              setValue(`products[${urutanArray}].price.text`, value.price);
            value.link &&
              setValue(`products[${urutanArray}].img.link`, value.link);
          }}
        />
      ),
    })
      .then(() => {
        console.log("confirm");
        setImage(Math.random());
      })
      .catch(() => console.log("cancelation"));
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <FormControl sx={{ width: "100%" }} variant="standard" size="small">
          <InputLabel htmlFor="outlined-adornment-password">Link</InputLabel>
          <Input
            size="small"
            id="standard-adornment-password"
            className="scroll-hidden"
            inputRef={ref}
            value={value}
            onChange={onChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={() => searchProduct(value)}
                  edge="end"
                >
                  <SearchIcon size="small" />
                </IconButton>
              </InputAdornment>
            }
            label="Link"
          />
        </FormControl>
      )}
    />
  );
};

export default InputLink;
