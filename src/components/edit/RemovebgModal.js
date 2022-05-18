import useDialog from "../../hooks/useDialog";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import API from "../../services";
import { useSnackbar } from "notistack";
import axios from "axios";

const RemovebgModal = ({ link, file, setValue, setLimit }) => {
  console.log(file);
  const { handleCancel, handleConfirm, handleClose } = useDialog();
  const [image, setImage] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const req = async () => {
      try {
        setIsFetching(true);
        const removebg = await API.getRemovebg();
        console.log(removebg);

        const formData = new FormData();

        formData.append("size", "auto");
        formData.append("image_url", link);
        // formData.append(file ? "image_file" : "image_url", file ? file : link);
        // };
        console.log(formData);
        const response = await axios({
          url: "https://api.remove.bg/v1.0/removebg",
          method: "post",
          data: formData,
          headers: {
            "X-Api-Key": removebg.apiKey,
          },
          responseType: "blob",
          encoding: null,
        });

        response.data.name = Date.now() + ".png";
        setImage({
          link: URL.createObjectURL(response.data),
          file: response.data,
        });

        removebg.limit--;
        await API.updateRemovebg(removebg);
        setIsFetching(false);

        setLimit((prev) => prev - 1);
        // console.log(res);
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.data.code);
        console.log(error.response.status);
        console.log(error.response.header);
        console.log(error.message);
        console.log(error.statusText);
        console.log(error.status);

        enqueueSnackbar("Gagal Remove Bg", { variant: "error" });
        handleClose();
      }
    };
    req();
  }, []);

  const submit = () => {
    setValue(image);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {image && <img className="w-[60%]" src={image.link} alt="" />}
      {isFetching && (
        <div className="animate-pulse w-full h-[300px] bg-gray-200 rounded-md" />
      )}
      <div className="flex w-full mt-5 gap-3">
        <Button
          disabled={isFetching}
          variant="contained"
          fullWidth
          color="primary"
          type="button"
          onClick={() => {
            submit();
            handleConfirm();
          }}
        >
          OK
        </Button>
        <Button
          disabled={isFetching}
          fullWidth
          variant="contained"
          color="primary"
          type="button"
          onClick={async () => {
            handleCancel();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default RemovebgModal;
