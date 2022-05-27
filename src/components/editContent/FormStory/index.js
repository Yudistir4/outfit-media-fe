import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
import { saveAs } from "file-saver";
import { useSnackbar } from "notistack";
import { AiFillCamera } from "react-icons/ai";
import { MdFileDownload } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import StatusToolbar from "../StatusToolbar";
import InputDateTimeWithCards from "../InputDateTimeWithCards";
import InputRevisi from "../InputRevisi";
import InputTags from "../InputTags";

import API from "../../../services";
import InputCopy from "../../../core/tailwind/InputCopy";
import Input from "../../../core/input/Input";

const InstastoryForm = ({ data }) => {
  const { control, handleSubmit, watch, register, setValue } = useForm({
    // resolver: yupResolver(FORM_VALIDATION),
    defaultValues: data,
  });
  console.log(data);
  const { enqueueSnackbar } = useSnackbar();
  const [isFetching, setIsFetching] = useState(false);
  const [isDownload, setIsDownload] = useState(false);

  const { file, url, filename, fileType } = watch("content.story.materi");
  let check;
  let link;
  let checkType;
  console.log(file);
  if (file || url) {
    check = true;
    if (file && file.length !== 0) {
      checkType = file[0].type.includes("video") ? "video" : "image";
      link = URL.createObjectURL(file[0]);
    } else if (url) {
      checkType = fileType || "image";
      link = url;
    }
  }

  const submit = async (data) => {
    setIsFetching(true);
    console.log(data);
    try {
      if (data.content.story.materi.file?.length > 0) {
        const fileType = data.content.story.materi.file[0].type.includes(
          "video"
        )
          ? "video"
          : "image";
        const { filename, url } = await API.uploadFile(
          data.content.story.materi.file[0],
          "storys"
        );
        data.content.story.materi = { filename, url, fileType };
      }
      delete data.content.story.materi.file;
      console.log(data);
      await API.updateContent(data);
      enqueueSnackbar("Save Success", { variant: "success" });
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
      enqueueSnackbar("Save Failed", { variant: "error" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full p-3 flex flex-col justify-center items-center gap-3 sm:flex-row"
    >
      <div
        htmlFor="materiFile"
        className={`relative overflow-hidden ${
          check ? "" : "h-[86vh]"
        } sm:h-[86vh] w-full max-w-[360px]  rounded-lg border-2 border-gray-300 flex justify-center items-center`}
      >
        <div className="z-10 transition-all duration-300 w-full h-full flex justify-center items-center absolute gap-3 opacity-0 hover:opacity-100 bg-black bg-opacity-50">
          <button
            type="button"
            disabled={isDownload}
            onClick={async () => {
              if (!file && !url) {
                return enqueueSnackbar("NO IMG", { variant: "error" });
              }
              setIsDownload(true);
              if (file?.length > 0) {
                await saveAs(file[0], file[0].name || "image.jpg");
              } else {
                await API.DownloadFileFirebase(url, filename || "image.jpg");
              }
              setIsDownload(false);
            }}
            className="text-white transition-all bg-blue-500 w-[60px] h-[60px] rounded-full hover:bg-blue-600 cursor-pointer flex justify-center items-center "
          >
            {isDownload ? (
              <AiOutlineLoading3Quarters
                className="animate-spin"
                size="1.5rem"
              />
            ) : (
              <MdFileDownload size="1.5rem" />
            )}
          </button>
          <label
            htmlFor="materiFile"
            className="text-white transition-all bg-blue-500 w-[60px] h-[60px] rounded-full hover:bg-blue-600 cursor-pointer flex justify-center items-center "
          >
            <AiFillCamera size="1.5rem" />
          </label>
        </div>

        {/* <div > */}
        {check && (
          <>
            {checkType !== "video" ? (
              <img src={link} className="h-full w-full object-contain" alt="" />
            ) : (
              <video src={link}></video>
            )}
          </>
        )}
        {/* </div> */}
      </div>
      <div className="h-[86vh] flex flex-col w-full max-w-[360px] gap-3">
        <input
          className="hidden"
          id="materiFile"
          {...register("content.story.materi.file")}
          type="file"
        />
        <StatusToolbar setValue={setValue} control={control} />

        {/* <InputCopy name="content.story.tags" control={control} label="Tags" /> */}
        <InputTags
          name="content.story.tags"
          control={control}
          setValue={setValue}
        />
        <InputCopy name="content.story.link" control={control} label="Link" />
        <Input
          label="Note"
          name="note"
          control={control}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
        />
        <InputDateTimeWithCards
          control={control}
          name="schedule"
          label="Schedule"
        />
        <InputRevisi name="revisi" control={control} setValue={setValue} />

        {/* <InputCopy name="link" control={control} label="Link" /> */}
        <button
          disabled={isFetching}
          className={` flex items-center justify-center w-full text-white py-3 ${
            isFetching ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
          }  rounded-lg transition-all`}
        >
          {isFetching ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            "SUBMIT"
          )}
        </button>
      </div>
    </form>
  );
};

// const InputCopy = (props) => {
//   const { control, name } = props;
//   const value = useWatch({ control, name });

//   const { enqueueSnackbar } = useSnackbar();
//   return (
//     <InputWithBtn
//       {...props}
//       variant="outlined"
//       button={
//         <CopyToClipboard
//           text={value}
//           onCopy={() =>
//             enqueueSnackbar(`${props.name} Copied!`, { variant: "success" })
//           }
//         >
//           <button
//             type="button"
//             className="p-[5px] hover:bg-gray-100 rounded-full cursor-pointer"
//           >
//             <MdOutlineContentCopy />
//           </button>
//         </CopyToClipboard>
//       }
//     />
//   );
// };

export default InstastoryForm;
