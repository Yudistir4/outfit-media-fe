import React from "react";
import { Controller } from "react-hook-form";

const Input = ({ label, name, control, placeholder }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <div className="relative mt-1">
            <label
              // htmlFor="i1"
              className="focus:bg-red-500 absolute bg-white text-xs p-1 top-[-13px] left-[8px]"
            >
              {label}
            </label>
            <input
              {...field}
              // id="i1"
              type="text"
              className="w-full border-gray-300 border-[1px] px-3 py-2 rounded-md outline-none focus:border-blue-500"
              placeholder={placeholder}
            />
          </div>
          {error && <p className="text-red-500 text-xs p-1">{error}</p>}
        </>
      )}
    />
  );
};

export default Input;
