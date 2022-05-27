import React from "react";
import { Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import { MdOutlineContentCopy } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";

const InputCopy = ({ label, name, control }) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <div className="relative mt-1">
            <label
              htmlFor={name || "pepe1"}
              className="bg-white absolute  text-xs px-1 top-[-8px] left-[8px]"
            >
              {label}
            </label>
            <input
              {...field}
              id={name || "pepe1"}
              type="text"
              className="w-full border-gray-300 border-[1px] px-3 py-2 rounded-md outline-none focus:border-blue-500"
              placeholder="Input"
            />
            <div className="h-full p-1 right-0 top-0 absolute flex items-center justify-center gap-2">
              <div className="bg-white">
                <CopyToClipboard
                  text={field.value}
                  onCopy={() =>
                    enqueueSnackbar(`${label} Copied!`, {
                      variant: "success",
                    })
                  }
                >
                  <button
                    type="button"
                    className="p-[5px] hover:bg-gray-100 rounded-full cursor-pointer"
                  >
                    <MdOutlineContentCopy />
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-xs p-1">{error}</p>}
        </>
      )}
    />
  );
};

export default InputCopy;
