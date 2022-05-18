import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";
import { MdOutlineContentCopy } from "react-icons/md";
import InputWithBtnOutlined from "../../core/input/InputWithBtnOutlined";
import { AiFillInstagram } from "react-icons/ai";
import { useWatch } from "react-hook-form";

const InputAuthor = ({ name, control }) => {
  const linkPost = useWatch({ control, name });

  console.log(linkPost);
  return (
    <InputWithBtnOutlined
      name={name}
      control={control}
      label="Link Post"
      button={
        <>
          <a
            className="p-[5px] hover:bg-gray-100 rounded-full cursor-pointer"
            href={linkPost}
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
