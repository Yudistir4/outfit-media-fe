import React, { useState, useEffect } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import RemovebgModal from "../editContent/FormReviewOutfit/RemovebgModal";
import useDialog from "../../hooks/useDialog";
import { useSnackbar } from "notistack";
import API from "../../services";

const Toolbar = ({
  handleDownload,
  handleAlignCenter,
  selectedImage,
  setImage,
  setValue,
}) => {
  const [limit, setLimit] = useState(999);

  const { enqueueSnackbar } = useSnackbar();
  const { createDialog } = useDialog();

  useEffect(() => {
    const req = async () => {
      let res = await API.getRemovebgs({ api_limit: true });
      setLimit(res.limit);
    };

    req();
  }, []);

  const removebg = () => {
    console.log(selectedImage);
    if (!selectedImage.link)
      return enqueueSnackbar("Select Image First", { variant: "error" });
    // if (selectedImage.file)
    //   return enqueueSnackbar("Save dulu", { variant: "error" });

    createDialog({
      title: "Remove Bg",
      allowClose: false,
      contentWithButton: (
        <RemovebgModal
          link={selectedImage.link}
          file={selectedImage.file}
          setLimit={setLimit}
          setValue={(value) => {
            console.log("setValue : ", value);
            setValue(
              `content.reviewOutfit.products[${selectedImage.index}].img.link`,
              value.link
            );
            setValue(
              `content.reviewOutfit.products[${selectedImage.index}].img.file`,
              value.file
            );
            setValue(
              `content.reviewOutfit.products[${selectedImage.index}].img.filename`,
              ""
            );
            setValue(
              `content.reviewOutfit.products[${selectedImage.index}].img.imgFromShopee`,
              false
            );
          }}
        />
      ),
    })
      .then(() => {
        console.log("confirm");
        setImage(Math.random());
      })
      .catch(() => {
        console.log("cancelation");
      });
  };

  return (
    <div className="w-full   h-full grid grid-cols-4 md:grid-cols-1 md:grid-rows-4 rounded-xl overflow-hidden">
      <div
        onClick={handleAlignCenter}
        className="bg-gray-700 flex justify-center  items-center hover:bg-blue-500 transition-all cursor-pointer"
      >
        <FormatAlignCenterIcon className="text-white" />
      </div>
      <div
        onClick={handleDownload}
        className="bg-gray-700 flex justify-center  items-center hover:bg-blue-500 transition-all cursor-pointer"
      >
        <ArrowDownwardIcon className="text-white" />
      </div>
      <div
        //    onClick={handleDownload}
        className="bg-gray-700 flex justify-center  items-center hover:bg-blue-500 transition-all cursor-pointer"
      >
        <RestartAltIcon className="text-white" />
      </div>
      <div
        onClick={removebg}
        className="bg-gray-700 flex justify-center  items-center hover:bg-blue-500 transition-all cursor-pointer relative"
      >
        <LayersClearIcon className="text-white" />
        <div className="absolute rounded-full bg-red-500 w-6 h-6 text-white   sm:top-[55%] top-[50%] left-[50%] sm:left-[45%] flex justify-center items-center text-xs">
          {limit}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
