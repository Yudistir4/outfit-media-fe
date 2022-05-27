import React, { useState } from "react";
import { useWatch } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlineContentCopy } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";

const InputTags = ({ control, name, setValue }) => {
  const revisi = useWatch({ control, name, setValue }) || [];
  const [input, setInput] = useState("");

  const { enqueueSnackbar } = useSnackbar();
  const addRevisi = () => {
    if (input) {
      setValue(name, [...revisi, { username: input }]);
      setInput("");
    }
  };

  const deleteRevisi = (username) => {
    const newData = [...revisi].filter((val) => val.username !== username);
    setValue(name, newData);
  };

  return (
    <React.Fragment>
      <div className="space-y-3">
        <div className="flex flex-col">
          <label htmlFor="">Tags</label>
          <div className="flex justify-center items-center">
            <input
              className="flex-1 focus:border-blue-400 outline-none border-gray-300 border-[1px] rounded-xl py-2 px-4 rounded-r-none"
              type="text"
              value={input}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
                e.key === "Enter" && addRevisi();
              }}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={addRevisi}
              type="button"
              className="bg-blue-600 rounded-xl h-[41px] w-10 text-white rounded-l-none flex justify-center items-center"
            >
              <MdAdd color="white" size="1.5rem" />
            </button>
          </div>
        </div>
        {revisi &&
          revisi.length !== 0 &&
          revisi.map((value, i) => (
            <div
              key={i}
              className="flex w-full rounded-lg overflow-hidden shadow-lg"
            >
              <div className="flex-1 p-3 max-w-[calc(100%-80px)]">
                {value.username}
              </div>
              <CopyToClipboard
                text={value.username}
                onCopy={() =>
                  enqueueSnackbar(`${value.username} Copied!`, {
                    variant: "success",
                  })
                }
              >
                <div
                  className={`bg-blue-500 hover:bg-blue-600 w-10 cursor-pointer flex justify-center items-center`}
                >
                  <MdOutlineContentCopy color="white" />
                </div>
              </CopyToClipboard>
              <div
                onClick={() => deleteRevisi(value.username)}
                className={`bg-red-600 hover:bg-red-700 w-10 cursor-pointer flex justify-center items-center`}
              >
                <MdDelete color="white" />
              </div>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default InputTags;
