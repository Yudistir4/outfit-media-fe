import React, { useState } from "react";
import { useWatch } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useAuth } from "../../store/Auth";

const InputRevisi = ({ control, name, setValue }) => {
  const { user } = useAuth();
  console.log(user);
  const revisi = useWatch({ control, name, setValue }) || [];
  const [input, setInput] = useState("");

  const addRevisi = () => {
    if (input) {
      setValue(name, [...revisi, { description: input, status: false }]);
      setInput("");
    }
  };

  const setStatus = (i) => {
    const newData = [...revisi];
    newData[i].status = !newData[i].status;
    setValue(name, newData);
  };

  const deleteRevisi = (description) => {
    const newData = [...revisi].filter(
      (val) => val.description !== description
    );
    setValue(name, newData);
  };
  const hasil =
    user.privileges === "owner" ||
    (user.privileges !== "owner" && revisi.length !== 0);
  return (
    <React.Fragment>
      {hasil && (
        <div className="space-y-3">
          <div className="flex flex-col">
            <label htmlFor="">Revisi</label>
            {user.privileges === "owner" && (
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
            )}
          </div>
          {revisi &&
            revisi.length !== 0 &&
            revisi.map((value, i) => (
              <div
                key={i}
                className="flex w-full rounded-lg overflow-hidden shadow-lg"
              >
                <div
                  onClick={() => setStatus(i)}
                  className={`${
                    value.status ? "bg-blue-600  " : "bg-gray-200  "
                  }  w-10 cursor-pointer flex justify-center items-center`}
                >
                  <FaCheck color={value.status ? "white" : "black"} />
                </div>
                <div className="flex-1 p-3 max-w-[calc(100%-80px)]">
                  {value.description}
                </div>
                {user.privileges === "owner" && (
                  <div
                    onClick={() => deleteRevisi(value.description)}
                    className={`bg-red-600 hover:bg-red-700 w-10 cursor-pointer flex justify-center items-center`}
                  >
                    <MdDelete color="white" />
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default InputRevisi;
