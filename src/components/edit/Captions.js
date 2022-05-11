import { Controller } from "react-hook-form";
import { tags } from "../../constants/dummy";
import { CopyToClipboard } from "react-copy-to-clipboard";

import React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useWatch } from "react-hook-form";
import { useSnackbar } from "notistack";

const Captions = ({ name, control }) => {
  const captions = useWatch({ control });
  const { enqueueSnackbar } = useSnackbar();

  let products = "";
  captions.products.forEach((item, i) => {
    products += `\n${i + 1}. ${item.productName} ${
      item.linkNo ? "(Link no " + item.linkNo + ")" : ""
    }`;
  });

  let tag = "";
  let index = [];
  for (let i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * tags.length);
    while (index.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * tags.length);
    }
    tag += tags[randomIndex] + " ";
    index.push(randomIndex);
  }

  let generateCaptions = `${captions.captions}\n${products}\n\nBy @${captions.author}\n\nMau di Repost juga?\nFollow dan tag kita dlu ya\nAbis itu DM mimin!\n\n${tag}`;
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ref },
        fieldState: { error },
        formState,
      }) => (
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            generate captions
          </InputLabel>
          <OutlinedInput
            className="scroll-hidden"
            multiline
            maxRows={5}
            id="outlined-adornment-password"
            // type={values.showPassword ? "text" : "password"}
            value={generateCaptions}
            onChange={onChange}
            endAdornment={
              <InputAdornment position="end">
                <CopyToClipboard
                  text={generateCaptions}
                  onCopy={() =>
                    enqueueSnackbar("Captions Copied!", { variant: "success" })
                  }
                >
                  <IconButton edge="end">
                    <ContentCopyIcon />
                  </IconButton>
                </CopyToClipboard>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      )}
    />
  );
};

export default Captions;
