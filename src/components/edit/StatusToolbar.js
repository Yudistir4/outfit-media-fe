import React from "react";
import { useWatch } from "react-hook-form";
import { RiImageEditFill } from "react-icons/ri";
import { IoEyeSharp } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
const StatusToolbar = ({ control, setValue }) => {
  const status = useWatch({ control, name: "status" });

  const setStatus = (type) => {
    setValue("status", type);
  };
  return (
    <div className="sticky top-0 z-10 row-start-1 md:col-start-2 lg:col-start-auto xl:col-start-2 p-1 gap-1 bg-blue-500 rounded-md grid grid-cols-4">
      {/* <button
          className={`${
            status === "inProgress" ? "text-blue-500 bg-white" : "text-white"
          }  h-9 transition-all hover:bg-white hover:text-blue-500 rounded-md flex justify-center items-center`}
        >
          PROGRES
        </button> */}
      <button
        type="button"
        onClick={() => setStatus("inProgress")}
        className={`${
          status === "inProgress" ? "text-blue-500 bg-white" : "text-white"
        }  h-9 transition-all hover:bg-white hover:text-blue-500 rounded-md flex justify-center items-center  `}
      >
        {/* PROGRESS  */}
        <RiImageEditFill size="1.5rem" />
      </button>
      <button
        type="button"
        onClick={() => setStatus("inReview")}
        className={`${
          status === "inReview" ? "text-blue-500 bg-white" : "text-white"
        } h-9 transition-all hover:bg-white hover:text-blue-500 rounded-md flex justify-center items-center  `}
      >
        {/* REVIEW */}
        <IoEyeSharp size="1.5rem" />
      </button>
      <button
        type="button"
        onClick={() => setStatus("inPost")}
        className={`${
          status === "inPost" ? "text-blue-500 bg-white" : "text-white"
        }  fill-blue-500 h-9 transition-all hover:bg-white hover:text-blue-500 rounded-md flex justify-center items-center  `}
      >
        {/* REVIEW */}
        <RiSendPlaneFill size="1.5rem" />
      </button>
      <button
        type="button"
        onClick={() => setStatus("done")}
        className={`${
          status === "done" ? "text-blue-500 bg-white" : "text-white"
        } h-9 transition-all hover:bg-white hover:text-blue-500 rounded-md flex justify-center items-center  `}
      >
        {/* DONE */}
        <FaCheck size="1.5rem" />
      </button>
    </div>
  );
};

export default StatusToolbar;
