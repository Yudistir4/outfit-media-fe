import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
import { saveAs } from "file-saver";
import { useSnackbar } from "notistack";
import { AiFillCamera } from "react-icons/ai";
import { MdFileDownload } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import StatusToolbar from "../StatusToolbar";
import InputDateTimeWithCards from "../InputDateTimeWithCards";
import InputRevisi from "../InputRevisi";
import InputTags from "../InputTags";

import API from "../../../services";
// import InputCopy from "../../../core/tailwind/InputCopy";
import Input from "../../../core/input/Input";

const FeedForm = ({ data }) => {
  const { control, handleSubmit, watch, setValue } = useForm({
    // resolver: yupResolver(FORM_VALIDATION),
    defaultValues: data,
  });
  console.log(data);
  const { enqueueSnackbar } = useSnackbar();
  const [isFetching, setIsFetching] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  // const [img, setImg] = useState();

  const onChange = (e) => {
    // console.log(e.target.files.length);
    // console.log(e.target.files);
    // if (e.target.files.length > 10)
    let data = [];
    for (let i = 0; i < e.target.files.length; i++) {
      if (i === 10) {
        enqueueSnackbar("Max 10 File", { variant: "error" });
        break;
      }
      data.push({
        file: e.target.files[i],
        fileType: e.target.files[i].type.includes("video") ? "video" : "image",
        url: URL.createObjectURL(e.target.files[i]),
      });
    }

    setValue("content.feed.materi", data);
  };

  const materi = watch("content.feed.materi");
  console.log(materi);

  const deleteMateri = (url) => {
    // console.log(materi);
    let newData = [...materi];
    newData = newData.filter((val) => val.url !== url);
    // console.log(newData);
    setValue("content.feed.materi", newData);
  };

  const setUrutan = (value, url) => {
    let data = [...materi];
    let newValue = data.filter((item) => item.url === url)[0];
    data = data.filter((item) => item.url !== url);
    data.splice(value - 1, 0, newValue);
    console.log(data);
    setValue("content.feed.materi", data);
  };

  const addFile = (e) => {
    let data = [];
    for (let i = 0; i < e.target.files.length; i++) {
      if (materi.length + i === 10) {
        enqueueSnackbar("Max 10 File", { variant: "error" });
        break;
      }
      data.push({
        file: e.target.files[i],
        fileType: e.target.files[i].type.includes("video") ? "video" : "image",
        url: URL.createObjectURL(e.target.files[i]),
      });
    }

    setValue("content.feed.materi", [...materi, ...data]);
    // console.log(newValue);
    // setValue("content.feed.materi", [
    //   ...materi,
    //   {
    //     file: newValue,
    //     url: URL.createObjectURL(newValue),
    //     fileType: newValue.type.includes("video") ? "video" : "image",
    //   },
    // ]);
  };
  // console.log(file);
  // const { file, url, filename, fileType } = watch("content.feed.materi");
  // let check;
  // let link;
  // let checkType;
  // console.log(file);
  // if (file || url) {
  //   check = true;
  //   if (file && file.length !== 0) {
  //     checkType = file[0].type.includes("video") ? "video" : "image";
  //     link = URL.createObjectURL(file[0]);
  //   } else if (url) {
  //     checkType = fileType || "image";
  //     link = url;
  //   }
  // }
  const downloadAllFile = async () => {
    try {
      setIsDownload(true);
      for (let i = 0; i < materi.length; i++) {
        if (materi[i].file) {
          await saveAs(materi[i].file, materi[i].file.name || "file.jpg");
        } else {
          await API.DownloadFileFirebase(
            materi[i].url,
            materi[i].filename || "file.jpg"
          );
        }
      }
      setIsDownload(false);
    } catch (error) {
      enqueueSnackbar("Download Failed", { variant: "error" });
    }
  };

  const submit = async (data) => {
    setIsFetching(true);
    console.log(data);
    try {
      for (let i = 0; i < data.content.feed.materi.length; i++) {
        if (data.content.feed.materi[i].file) {
          const { filename, url } = await API.uploadFile(
            data.content.feed.materi[i].file,
            "feeds"
          );
          data.content.feed.materi[i].filename = filename;
          data.content.feed.materi[i].url = url;
          delete data.content.feed.materi[i].file;
        }
      }

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
        className={`relative overflow-hidden 
        ${materi.length > 0 ? "" : "aspect-square sm:h-[86vh]"} 
        sm:h-[86vh] w-full max-w-[360px]  rounded-lg  flex flex-col justify-center items-center gap-2`}
      >
        {materi.length > 0 && materi.length < 10 && (
          <>
            <button
              type="button"
              disabled={isDownload}
              onClick={downloadAllFile}
              className={` flex items-center justify-center w-full text-white py-2 gap-2 ${
                isDownload ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
              }  rounded-lg transition-all`}
              // className={` flex items-center justify-center w-full text-white py-2 gap-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all`}
            >
              {isDownload ? (
                <AiOutlineLoading3Quarters
                  className="animate-spin"
                  size="1.2rem"
                />
              ) : (
                <>
                  <MdFileDownload size="1.2rem" />
                  DOWNLOAD ALL FILE
                </>
              )}
            </button>
            <label
              htmlFor="addFile"
              className={` flex items-center justify-center w-full text-white py-2 gap-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all`}
            >
              <AiFillCamera size="1.2rem" />
              ADD FILE
            </label>
          </>
        )}
        <input
          className="hidden"
          type="file"
          onChange={addFile}
          id="addFile"
          multiple
        />
        {materi.length === 0 && (
          <div className="z-10 transition-all duration-300 w-full h-full flex justify-center items-center absolute gap-3    bg-black bg-opacity-50">
            {/* <button
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
          </button> */}
            <label
              htmlFor="materiFile"
              className="text-white transition-all bg-blue-500 w-[60px] h-[60px] rounded-full hover:bg-blue-600 cursor-pointer flex justify-center items-center "
            >
              <AiFillCamera size="1.5rem" />
            </label>
          </div>
        )}
        {materi.length > 0 && (
          <div className="overflow-y-auto gap-3 flex w-full p-5 border-2 border-gray-300 rounded-lg">
            {materi.map((val, i) => (
              <div
                key={i}
                className="flex flex-col h-full w-full flex-shrink-0 justify-center items-center gap-2 shadow-lg shadow-gray-500 rounded-lg"
              >
                <div className="flex items-center justify-between w-full px-1 pt-1">
                  <div className="flex items-center gap-2">
                    <h5 className="">Slide: </h5>
                    <select
                      className="outline-none border-2 border-gray-300 rounded-lg px-2"
                      onChange={(e) => setUrutan(e.target.value, val.url)}
                      value={i + 1}
                    >
                      {materi.map((item, index) => (
                        <option
                          key={index + item.url}
                          // selected={index === i ? true : false}
                          value={index + 1}
                        >
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteMateri(val.url)}
                    className="text-red-500 w-8 h-8  flex justify-center items-center hover:bg-gray-100 rounded-full"
                  >
                    <MdDelete />
                  </button>
                </div>
                <div className="h-full">
                  {val.fileType === "video" ? (
                    <video
                      className="object-cover w-full aspect-square"
                      src={val.url}
                      alt=""
                    />
                  ) : (
                    <img
                      className="object-cover w-full aspect-square"
                      src={val.url}
                      alt=""
                    />
                  )}
                </div>
                {/* <div className="w-full h-10 flex justify-center items-center gap-2">
                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                  K
                </div>
                <div className="">GANTI URUTAN SLIDE</div>
                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                  O
                </div>
              </div> */}
              </div>
            ))}
          </div>
        )}
        {/* {checkType !== "video" ? (
          <img src={link} className="h-full w-full object-contain" alt="" />
        ) : (
          <video src={link}></video>
        )} */}
      </div>
      <div className="h-[86vh] flex flex-col w-full max-w-[360px] gap-3">
        <input
          className="hidden"
          multiple
          id="materiFile"
          onChange={onChange}
          // {...register("file")}
          type="file"
        />
        {/* <input
          className="hidden"
          id="materiFile"
          {...register("content.feed.materi.file")}
          type="file"
        /> */}
        <StatusToolbar setValue={setValue} control={control} />

        {/* <InputCopy name="content.feed.tags" control={control} label="Tags" /> */}
        <InputTags
          name="content.feed.tags"
          control={control}
          setValue={setValue}
        />
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

export default FeedForm;
