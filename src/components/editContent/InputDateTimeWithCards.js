import React from "react";
import { useWatch } from "react-hook-form";
import { useAuth } from "../../store/Auth";
import InputDateTime from "../../core/input/InputDateTime";

const InputDateTimeWithCards = ({ name, control, label }) => {
  const time = useWatch({ control, name });
  const { user } = useAuth();

  return (
    <>
      {user.privileges === "owner" && (
        <InputDateTime
          control={control}
          name={name}
          size="small"
          label={label}
        />
      )}
      {time && (
        <div className="flex-shrink-0 w-full h-10 bg-red-500 shadow-red-300 shadow-lg rounded-lg text-white flex items-center px-3 ">
          {new Date(time).toLocaleString("id-ID", {
            weekday: "long",
            // year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
          <div className="flex-1"></div>
          <div className="bg-white text-red-500 rounded-lg px-3 py-1 font-bold">
            {label.toUpperCase()}
          </div>
        </div>
      )}
    </>
  );
};

export default InputDateTimeWithCards;
