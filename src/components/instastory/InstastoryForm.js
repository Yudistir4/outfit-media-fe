import React from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
import { saveAs } from "file-saver";
import { useSnackbar } from "notistack";
import API from "../../services";

import StatusToolbar from "../edit/StatusToolbar.js";
import InputCopy from "../../core/tailwind/InputCopy";
import Input from "../../core/input/Input";
import InputDateTimeWithCards from "./InputDateTimeWithCards";
import { AiFillCamera } from "react-icons/ai";
import { MdFileDownload } from "react-icons/md";
const InstastoryForm = () => {
  const { control, handleSubmit, watch, register, setValue } = useForm({
    // resolver: yupResolver(FORM_VALIDATION),
    defaultValues: {
      materi: { filename: "", url: "", file: "" },
      jadwalPost: "",
      status: "inProgress",
      note: "",
      link: "",
      username: "",
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const { file, url, filename } = watch("materi");
  const submit = async (data) => {
    console.log(data);
    try {
      // if (data.materi.file) {
      //   const { filename, url } = await API.uploadFile(
      //     data.materi.file[0],
      //     "storys"
      //   );
      //   data.materi = {filename,url}
      // }
      // await API.updateStory(data)
    } catch (error) {
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
          file ? "" : "h-[86vh]"
        } sm:h-[86vh] w-full max-w-[360px]  rounded-lg border-2 border-gray-300 flex justify-center items-center`}
      >
        <div className="transition-all duration-300 w-full h-full flex justify-center items-center absolute gap-3 opacity-0 hover:opacity-100 bg-black bg-opacity-50">
          <div
            onClick={() => {
              if (!file[0] && !url) {
                return enqueueSnackbar("NO IMG", { variant: "error" });
              }
              if (file) {
                saveAs(file[0], file[0].name || "image.jpg");
              } else {
                API.DownloadFileFirebase(url, filename || "image.jpg");
              }
            }}
            className="text-white transition-all bg-blue-500 w-[60px] h-[60px] rounded-full hover:bg-blue-600 cursor-pointer flex justify-center items-center "
          >
            <MdFileDownload size="1.5rem" />
          </div>
          <label
            htmlFor="materiFile"
            className="text-white transition-all bg-blue-500 w-[60px] h-[60px] rounded-full hover:bg-blue-600 cursor-pointer flex justify-center items-center "
          >
            <AiFillCamera size="1.5rem" />
          </label>
        </div>

        {/* <div > */}
        {file && (
          <>
            {file[0].type !== "video/mp4" ? (
              <img
                src={URL.createObjectURL(file[0])}
                className="h-full w-full object-contain"
                alt=""
              />
            ) : (
              <video src={URL.createObjectURL(file[0])}></video>
            )}
          </>
        )}
        {/* </div> */}
      </div>
      <div className="h-[86vh] flex flex-col w-full max-w-[360px] gap-3">
        <input
          className="hidden"
          id="materiFile"
          {...register("materi.file")}
          type="file"
        />
        <StatusToolbar setValue={setValue} control={control} />

        <InputCopy name="username" control={control} label="Username" />
        <InputCopy name="link" control={control} label="Link" />
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
          name="jadwalPost"
          label="Schedule"
        />

        {/* <InputCopy name="link" control={control} label="Link" /> */}
        <button className="w-full text-white py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all">
          SUBMIT
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
