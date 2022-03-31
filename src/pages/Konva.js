import React, { useRef, useState, useEffect } from "react";
import { getPost, position } from "../constants/dummy";
import "./konva.css";

import Tabbar from "../components/konva/Tabbar";
import Products from "../components/edit/Products";

import V3 from "../components/konva/V3";
import Grid from "@mui/material/Grid";

import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useSnackbar } from "notistack";
// import { WRITE_VALIDATION } from "../validations/formValidation";
// import { useAuth } from "../store/Auth";
// import API from "../services";
// import { useHistory } from "react-router-dom";

import Input from "../core/input/Input";
import InputImage from "../components/konva/InputImage";

// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import Avatar from "@mui/material/Avatar";
// import ImageIcon from "@mui/icons-material/Image";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

// const VALIDATION =
const Konva = () => {
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  // const [error, setError] = useState();
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useForm({
    // resolver: yupResolver(VALIDATION),
    defaultValues: getPost,
  });

  const [image, setImage] = useState();

  const values = getValues();

  const submit = async (e) => {
    console.log(e);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={2} p={1}>
          <Grid item xs={6} container spacing={1}>
            <V3
              initPost={values}
              control={control}
              setValue={setValue}
              page={page}
              watch={watch}
              getValues={getValues}
            />
          </Grid>
          <Grid container item xs spacing={2}>
            <Grid item xs={6} className="products">
              <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                <Tabbar
                  pageCount={values.halaman}
                  page={page}
                  setPage={setPage}
                  setValue={setValue}
                  control={control}
                />
                <InputImage
                  control={control}
                  nameOrId={`displayImg[${page - 1}]`}
                  setImage={setImage}
                  position="displayImg"
                />
                <Products
                  control={control}
                  setValue={setValue}
                  page={page}
                  watch={watch}
                  setImage={setImage}
                  products={values.products}
                />
                {/* {products}
                {products.length < 3 && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => addProduct(products.length + 1)}
                  >
                    ADD PRODUCT
                  </Button>
                )} */}

                <LoadingButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  loading={isFetching}
                  // sx={{ width: "100%" }}
                >
                  UPLOAD
                </LoadingButton>
              </Box>
            </Grid>
            <Grid item xs={6} className="products">
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
            </Grid>
          </Grid>
          {/* <Grid item xs={1}></Grid> */}
        </Grid>
      </form>
    </>
  );
};

export default Konva;
