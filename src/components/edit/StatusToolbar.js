import React from "react";
import { useWatch } from "react-hook-form";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

const StatusToolbar = ({ control, setValue }) => {
  const status = useWatch({ control, name: "status" });

  const setStatus = (type) => {
    setValue("status", type);
  };
  return (
    <div className="sticky top-0 z-10 row-start-1 md:col-start-2 lg:col-start-auto xl:col-start-2 p-1 gap-1 bg-blue-500 rounded-md grid grid-cols-3">
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
        <PublishedWithChangesIcon />
      </button>
      <button
        type="button"
        onClick={() => setStatus("inReview")}
        className={`${
          status === "inReview" ? "text-blue-500 bg-white" : "text-white"
        } h-9 transition-all hover:bg-white hover:text-blue-500 rounded-md flex justify-center items-center  `}
      >
        {/* REVIEW */}
        <VisibilityIcon />
      </button>
      <button
        type="button"
        onClick={() => setStatus("done")}
        className={`${
          status === "done" ? "text-blue-500 bg-white" : "text-white"
        } h-9 transition-all hover:bg-white hover:text-blue-500 rounded-md flex justify-center items-center  `}
      >
        {/* DONE */}
        <DoneOutlineIcon />
      </button>
    </div>
  );
};

export default StatusToolbar;
