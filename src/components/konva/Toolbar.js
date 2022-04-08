import React, { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const initState = {
  jadwal: false,
};
const Toolbar = ({ handleDownload, handleAlignCenter }) => {
  const [state, setState] = useState(initState);

  const handleClick = () => {
    setState((prev) => {
      return { jadwal: !prev.jadwal };
    });
  };

  return (
    <div className="w-full   h-full grid grid-cols-4 md:grid-cols-1 md:grid-rows-4 rounded-xl overflow-hidden">
      <div
        onClick={handleAlignCenter}
        className="bg-gray-700 flex justify-center  items-center hover:bg-blue-600 transition-all cursor-pointer"
      >
        <FormatAlignCenterIcon className="text-white" />
      </div>
      <div
        onClick={handleDownload}
        className="bg-blue-500 flex justify-center  items-center hover:bg-blue-600 transition-all cursor-pointer"
      >
        <ArrowDownwardIcon className="text-white" />
      </div>
      <div
        //    onClick={handleDownload}
        className="bg-blue-500 flex justify-center  items-center hover:bg-blue-600 transition-all cursor-pointer"
      >
        <RestartAltIcon className="text-white" />
      </div>
    </div>
  );
};

export default Toolbar;
