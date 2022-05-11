import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";
import { MdOutlineContentCopy } from "react-icons/md";
import InputWithBtnOutlined from "../../core/input/InputWithBtnOutlined";
import IconButton from "@mui/material/IconButton";

const InputShortLink = ({ name, control, watch }) => {
  const { enqueueSnackbar } = useSnackbar();
  const shortLink = watch(name);
  console.log(shortLink);
  return (
    <InputWithBtnOutlined
      name={name}
      control={control}
      label="Short Link"
      button={
        <CopyToClipboard
          text={shortLink}
          onCopy={() =>
            shortLink !== "" &&
            shortLink &&
            enqueueSnackbar("Link Copied!", { variant: "success" })
          }
        >
          <IconButton size="small" edge="end">
            <MdOutlineContentCopy />
          </IconButton>
        </CopyToClipboard>
      }
    />
  );
};

export default InputShortLink;
