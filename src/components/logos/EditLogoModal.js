import React, { useState, useEffect } from "react";
import useDialog from "../../hooks/useDialog";
import Input from "../../core/input/Input";
import InputImage from "../../core/input/InputImage";
import { useForm } from "react-hook-form";
import { BsFillCameraFill } from "react-icons/bs";
import Button from "@mui/material/Button";
import API from "../../services";
import { useSnackbar } from "notistack";

const EditLogoModal = ({ logo }) => {
  const [image, setImage] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const { handleClose, handleConfirm, handleCancel } = useDialog();

  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm({
    //     resolver: yupResolver(FORM_VALIDATION),
    defaultValues: {
      ...logo,
    },
  });

  // const getLogo = async (id) => {
  //   const res = await API.getLogo(id);
  //   setLogo(res);
  // };

  const submit = async (data) => {
    console.log(data);

    setIsFetching(true);
    try {
      let result = {};
      if (data.file) {
        result = await new Promise((res) => {
          var image = new Image();
          image.src = URL.createObjectURL(data.file);
          image.onload = function () {
            let pembagi = image.height / 6;
            var result = {
              width: image.width / pembagi,
              height: image.height / pembagi,
              x: 81.435 - image.width / pembagi / 2,
              radius: image.width === image.height ? true : false,
            };
            res(result);
          };
        });

        // const logo = await API.getLogoByUsername(data.username);
        // if (logo) {
        //   enqueueSnackbar("Username Sudah Ada", { variant: "error" });
        //   setIsFetching(false);
        //   return;
        // }

        const { url, filename } = await API.uploadFile(data.file, "logo");
        data.filename = filename;
        data.link = url;
      }

      console.log(data);
      console.log(result);
      await API.updateLogo({ ...data, ...result });
      setIsFetching(false);
      enqueueSnackbar("Update Logo Success", { variant: "success" });
      handleConfirm();
    } catch (error) {
      enqueueSnackbar("Update Logo Failed", { variant: "error" });
      console.log(error);
      handleClose();
    }
  };

  return (
    <form className="grid grid-cols-1 gap-3" onSubmit={handleSubmit(submit)}>
      <div className=" h-[100px] w-[100px] relative m-auto">
        <img
          className="rounded-full border-gray-300 border-solid border-[1px] w-full h-full object-cover"
          src={(image && URL.createObjectURL(image)) || logo.link}
          alt=""
        />
        <label
          htmlFor="file"
          className="cursor-pointer flex justify-center items-center w-8 h-8 bg-blue-600 rounded-full absolute right-0 bottom-0 hover:bg-blue-700 transition-all duration-300"
        >
          <BsFillCameraFill color="white" />
        </label>
      </div>

      <InputImage
        control={control}
        nameOrId="file"
        setImage={setImage}
        btn="none"
      />
      <Input
        label="Username"
        name={`username`}
        control={control}
        variant="outlined"
        fullWidth
        placeholder="Username"
      />
      {/* <Radio
        label="Radius"
        name={`radius`}
        control={control}
        options={[
          { value: true, label: "Yes" },
          { value: false, label: "No" },
        ]}
        //    fullWidth
      /> */}
      <div className="w-full grid grid-cols-2 gap-3">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isFetching}
          fullWidth
        >
          SUBMIT
        </Button>
        <Button
          type="button"
          onClick={handleCancel}
          variant="contained"
          color="error"
          disabled={isFetching}
          fullWidth
        >
          CANCEL
        </Button>
      </div>
    </form>
  );
};

export default EditLogoModal;
