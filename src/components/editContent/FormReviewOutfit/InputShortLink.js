import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";
import { MdOutlineContentCopy } from "react-icons/md";
import { useWatch } from "react-hook-form";
import { BiLinkExternal } from "react-icons/bi";

import InputWithBtnOutlined from "../../../core/input/InputWithBtnOutlined";

const InputShortLink = ({ name, control }) => {
  const { enqueueSnackbar } = useSnackbar();
  // const shortLink = watch(name);
  const shortLink = useWatch({ control, name });

  console.log(shortLink);
  return (
    <InputWithBtnOutlined
      name={name}
      control={control}
      label="Short Link"
      button={
        <>
          <a
            className="p-[5px] hover:bg-gray-100 rounded-full cursor-pointer"
            href={shortLink}
            target="_blank"
            rel="noreferrer"
          >
            <BiLinkExternal />
          </a>
          <CopyToClipboard
            text={shortLink}
            onCopy={() =>
              shortLink !== "" &&
              shortLink &&
              enqueueSnackbar("Link Copied!", { variant: "success" })
            }
          >
            <button
              type="button"
              className="p-[5px] hover:bg-gray-100 rounded-full cursor-pointer"
            >
              <MdOutlineContentCopy />
            </button>
          </CopyToClipboard>
        </>
      }
    />
  );
};

export default InputShortLink;
