import React, { useState } from "react";
// import "./konva.css";
import API from "../../../services";
import { useSnackbar } from "notistack";
import { saveAs } from "file-saver";
import Fab from "@mui/material/Fab";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SaveIcon from "@mui/icons-material/Save";
import { useForm } from "react-hook-form";
import IconButton from "@mui/material/IconButton";

import InputDateTimeWithCards from "../InputDateTimeWithCards";
import StatusToolbar from "../StatusToolbar";
import InputRevisi from "../InputRevisi";

import InputAuthor from "./InputAuthor";
import InputLinkPost from "./InputLinkPost";
import Products from "./Products";
import Captions from "./Captions";

import Tabbar from "./Tabbar";
import PostEditor from "../../konva/PostEditor";

// import V3 from "../components/konva/V3";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useSnackbar } from "notistack";
// import { WRITE_VALIDATION } from "../validations/formValidation";
// import { useAuth } from "../store/Auth";
// import API from "../services";

import Input from "../../../core/input/Input";
import InputImage from "../../konva/InputImage";

const FormReviewOutfit = ({ data }) => {
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, watch, getValues, setValue } = useForm({
    // resolver: yupResolver(VALIDATION),
    defaultValues: data,
  });

  const [image, setImage] = useState();
  console.log(image);

  const values = getValues();

  const submit = async (data) => {
    console.log(data);
    setIsFetching(true);
    try {
      for (let i = 0; i < data.content.reviewOutfit.displayImg.length; i++) {
        if (data.content.reviewOutfit.displayImg[i].file) {
          console.log(true);
          const { filename, url } = await API.uploadFile(
            data.content.reviewOutfit.displayImg[i].file,
            "displayImgs"
          );
          data.content.reviewOutfit.displayImg[i].filename = filename;
          data.content.reviewOutfit.displayImg[i].link = url;
          delete data.content.reviewOutfit.displayImg[i].file;
        }
      }

      for (let i = 0; i < data.content.reviewOutfit.products.length; i++) {
        if (data.content.reviewOutfit.products[i].img.file) {
          console.log(true);
          const { filename, url } = await API.uploadFile(
            data.content.reviewOutfit.products[i].img.file,
            "products"
          );
          data.content.reviewOutfit.products[i].img.filename = filename;
          data.content.reviewOutfit.products[i].img.link = url;
          delete data.content.reviewOutfit.products[i].img.file;
        }
      }
      console.log(data.content.reviewOutfit.displayImg);
      // });

      delete data.__v;
      console.log("submit : ", data);
      const res = await API.updateContent(data);
      console.log("respon : ", res);

      enqueueSnackbar("Save Success", { variant: "success" });
      setIsFetching(false);
    } catch (error) {
      enqueueSnackbar("save gagal", { variant: "error" });
      console.error("save gagal : ", error);
      setIsFetching(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        {/* <Grid container spacing={2} p={1}> */}
        <div className=" md:px-0 px-4 lg:px-4   flex flex-wrap lg:flex-nowrap     md:max-w-[100vh] mx-auto lg:max-w-none gap-2 lg:max-h-[88vh]">
          <div className="flex w-full lg:max-w-max flex-wrap justify-between lg:justify-start gap-2">
            <PostEditor
              initPost={{ ...values.content.reviewOutfit }}
              control={control}
              setValue={setValue}
              page={page}
              watch={watch}
              setImage={setImage}
              getValues={getValues}
            />
          </div>
          <div className="flex-1 pb-20 overflow-y-auto lg:h-[88vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3  lg:grid-cols-1 xl:grid-cols-2">
              <Tabbar
                page={page}
                setPage={setPage}
                setValue={setValue}
                control={control}
              />
              <StatusToolbar setValue={setValue} control={control} />

              <div className="flex gap-4 flex-col">
                <div className="p-3 flex flex-col rounded-lg border-gray-200   border-solid border-2">
                  <div className="flex justify-center items-center">
                    <InputImage
                      control={control}
                      nameOrId={`content.reviewOutfit.displayImg[${page - 1}]`}
                      setImage={setImage}
                      position="displayImg"
                    />
                    <IconButton
                      onClick={() => {
                        if (
                          !values.content.reviewOutfit.displayImg[page - 1].link
                        ) {
                          return enqueueSnackbar("NO IMG", {
                            variant: "error",
                          });
                        }

                        if (
                          !values.content.reviewOutfit.displayImg[page - 1].file
                        ) {
                          API.DownloadFileFirebase(
                            values.content.reviewOutfit.displayImg[page - 1]
                              .link,
                            values.content.reviewOutfit.displayImg[page - 1]
                              .filename || "image.png"
                          );
                        } else {
                          saveAs(
                            values.content.reviewOutfit.displayImg[page - 1]
                              .link,
                            values.content.reviewOutfit.displayImg[page - 1]
                              .filename || "image.png"
                          );
                        }
                      }}
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                  </div>
                  <InputAuthor
                    control={control}
                    name="content.reviewOutfit.author"
                  />
                  <InputLinkPost
                    control={control}
                    name="content.reviewOutfit.linkPost"
                  />
                </div>

                <Products
                  control={control}
                  setValue={setValue}
                  page={page}
                  watch={watch}
                  setImage={setImage}
                  products={values.content.reviewOutfit.products}
                />
              </div>
              <div className="flex gap-4 flex-col">
                <InputDateTimeWithCards
                  control={control}
                  name="schedule"
                  size="small"
                  label="Schedule"
                />

                <InputDateTimeWithCards
                  control={control}
                  name="deadline"
                  label="Deadline"
                />

                <Input
                  name={`note`}
                  control={control}
                  variant="outlined"
                  fullWidth
                  label="Note"
                  placeholder="Note"
                  multiline
                  rows={3}
                />
                <InputRevisi
                  control={control}
                  name="revisi"
                  setValue={setValue}
                />
                <Input
                  name={`content.reviewOutfit.captions`}
                  control={control}
                  variant="outlined"
                  fullWidth
                  label="Captions"
                  placeholder="caption..."
                  multiline
                  rows={3}
                />
                <Captions
                  control={control}
                  name="content.reviewOutfit.generateCaptions"
                />
              </div>

              {/* </Grid> */}
            </div>
          </div>
          {/* </Grid> */}
          <Fab
            disabled={isFetching}
            color="primary"
            type="submit"
            // className="absolute right-0 bottom-0"
            sx={{ position: "fixed", right: 30, bottom: 30 }}
          >
            {isFetching ? (
              // <div className="flex justify-center items-center w-full h-full">
              <svg
                role="status"
                className="w-8 h-8 text-white animate-spin dark:text-gray-500 fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              // </div>
              // </div>
              <SaveIcon />
            )}
          </Fab>
        </div>
        {/* <Grid item xs={1}></Grid> */}
        {/* </Grid> */}
      </form>
    </>
  );
};

export default FormReviewOutfit;
