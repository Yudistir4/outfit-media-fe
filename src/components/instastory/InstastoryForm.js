import React from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
import StatusToolbar from "../edit/StatusToolbar.js";
import InputCopy from "../../core/tailwind/InputCopy";
import Input from "../../core/input/Input";
import InputDateTimeWithCards from "./InputDateTimeWithCards";

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

  const file = watch("materi.file");
  console.log(file);
  const submit = (data) => {
    console.log(data);
    console.log(data.materi.file[0]);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full p-3 flex flex-col justify-center items-center gap-3 sm:flex-row"
    >
      <label
        htmlFor="materiFile"
        className="cursor-pointer overflow-hidden h-[86vh] w-full max-w-[360px]  rounded-lg border-2 border-gray-300 flex justify-center items-center"
      >
        <div className="w-full h-full flex justify-evenly">
          {/* <div class=""></div> */}
        </div>
        {/* <div > */}
        {file ? (
          <>
            {file[0].type !== "video/mp4" ? (
              <img
                src={URL.createObjectURL(file[0])}
                className="h-full w-full object-cover"
                alt=""
              />
            ) : (
              <video src={URL.createObjectURL(file[0])}></video>
            )}
          </>
        ) : (
          <div className="">Click To Add File</div>
        )}
        {/* </div> */}
      </label>
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
          size="small"
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
