import React, { useState } from "react";
import { position, createPost } from "../constants/dummy";
import "./konva.css";
import { useSnackbar } from "notistack";
import API from "../services";

import Tabbar from "../components/konva/Tabbar";
import Products from "../components/edit/Products";
import Captions from "../components/edit/Captions";
import StatusToolbar from "../components/edit/StatusToolbar";

import { saveAs } from "file-saver";
import Fab from "@mui/material/Fab";
// import V3 from "../components/konva/V3";
import PostEditor from "../components/konva/PostEditor";
import Grid from "@mui/material/Grid";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SaveIcon from "@mui/icons-material/Save";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useSnackbar } from "notistack";
// import { WRITE_VALIDATION } from "../validations/formValidation";
// import { useAuth } from "../store/Auth";
// import API from "../services";
// import { useHistory } from "react-router-dom";

import Input from "../core/input/Input";
import InputImage from "../components/konva/InputImage";
import IconButton from "@mui/material/IconButton";

// const VALIDATION =
const Create = () => {
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  // const [error, setError] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useForm({
    // resolver: yupResolver(VALIDATION),
    defaultValues: createPost,
  });

  const [image, setImage] = useState();

  const values = getValues();

  const submit = async (data) => {
    // console.log(data);
    try {
      console.log(data.displayImg);

      for (let i = 0; i < data.displayImg.length; i++) {
        if (data.displayImg[i].file) {
          console.log(true);
          const { filename, url } = await API.uploadFile(
            data.displayImg[i].file,
            "dummy"
          );
          data.displayImg[i].filename = filename;
          data.displayImg[i].link = url;
          delete data.displayImg[i].file;
        }
      }

      for (let i = 0; i < data.products.length; i++) {
        if (data.products[i].img.file) {
          console.log(true);
          const { filename, url } = await API.uploadFile(
            data.products[i].img.file,
            "dummy"
          );
          data.products[i].img.filename = filename;
          data.products[i].img.link = url;
          delete data.products[i].img.file;
        }
      }
      console.log(data.displayImg);
      // });
      // await API.createPost();
      // await API.createPost();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        {/* <Grid container spacing={2} p={1}> */}
        <div className="md:px-0 px-4 lg:px-4 box-border flex flex-wrap border-2 border-cyan-200 md:max-w-[100vh] mx-auto lg:max-w-none gap-2 lg:max-h-[90vh]">
          <div className="flex w-full lg:max-w-max flex-wrap justify-between lg:justify-start gap-2">
            {/* <Grid item xs={6} container spacing={1}> */}
            <PostEditor
              initPost={values}
              control={control}
              setValue={setValue}
              page={page}
              watch={watch}
              getValues={getValues}
            />
            {/* </Grid> */}
          </div>
          <div className="flex-grow overflow-y-auto lg:h-[90vh]">
            {/* <Grid container item xs spacing={2}> */}
            {/* <Grid item xs={6} className="products"> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3  lg:grid-cols-1 xl:grid-cols-2">
              <Tabbar
                page={page}
                setPage={setPage}
                setValue={setValue}
                control={control}
              />
              <StatusToolbar setValue={setValue} control={control} />

              <div className="flex gap-4 flex-col">
                <div className="flex">
                  <InputImage
                    control={control}
                    nameOrId={`displayImg[${page - 1}]`}
                    setImage={setImage}
                    position="displayImg"
                  />
                  <IconButton
                    onClick={() =>
                      saveAs(
                        values.displayImg[page - 1].link,
                        values.displayImg[page - 1].name || "image.jpg"
                      )
                    }
                  >
                    <ArrowDownwardIcon />
                  </IconButton>
                </div>

                <Products
                  control={control}
                  setValue={setValue}
                  page={page}
                  watch={watch}
                  setImage={setImage}
                  products={values.products}
                />

                {/* <LoadingButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  loading={isFetching}
                  // sx={{ width: "100%" }}
                >
                  UPLOAD
                </LoadingButton> */}
              </div>
              {/* </Grid> */}
              {/* <Grid item xs={6} className="products"> */}
              <div className="flex gap-4 flex-col">
                <Input
                  name={`captions`}
                  control={control}
                  variant="outlined"
                  fullWidth
                  label="Captions"
                  placeholder="caption..."
                  multiline
                  rows={3}
                />
                <Captions control={control} name="generateCaptions" />
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
              </div>

              {/* </Grid> */}
            </div>
          </div>
          {/* </Grid> */}
          <Fab
            color="primary"
            type="submit"
            // className="absolute right-0 bottom-0"
            sx={{ position: "fixed", right: 30, bottom: 30 }}
          >
            {isFetching ? (
              // <div className="flex justify-center items-center">
              // <svg
              //   className="animate-spin h-5 w-5 mr-3 ..."
              //   viewBox="0 0 24 24"
              // ></svg>
              <div className="flex justify-center items-center">
                <div
                  className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                  role="status"
                >
                  {/* <span className="visually-hidden">Loading...</span> */}
                </div>
              </div>
            ) : (
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

export default Create;
