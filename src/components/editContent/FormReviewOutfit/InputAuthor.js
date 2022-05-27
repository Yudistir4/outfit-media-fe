import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";
import { MdOutlineContentCopy } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { useWatch } from "react-hook-form";

import InputWithBtnOutlined from "../../../core/input/InputWithBtnOutlined";
const InputAuthor = ({ name, control }) => {
  const { enqueueSnackbar } = useSnackbar();
  const author = useWatch({ control, name });

  console.log(author);
  return (
    <InputWithBtnOutlined
      name={name}
      control={control}
      label="Author"
      button={
        <>
          <CopyToClipboard
            text={author}
            onCopy={() =>
              author !== "" &&
              author &&
              enqueueSnackbar("Author Copied!", { variant: "success" })
            }
          >
            <button
              type="button"
              className="p-[5px] hover:bg-gray-100 rounded-full cursor-pointer"
            >
              <MdOutlineContentCopy />
            </button>
          </CopyToClipboard>

          <a
            className="p-[5px] hover:bg-gray-100 rounded-full cursor-pointer"
            href={`https://www.instagram.com/${author}`}
            target="_blank"
            rel="noreferrer"
          >
            <AiFillInstagram />
          </a>
        </>
      }
    />
  );
};

export default InputAuthor;
