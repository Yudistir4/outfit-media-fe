import useDialog from "../../hooks/useDialog";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import API from "../../services";

const RemovebgModal = ({ link, setValue, setLimit }) => {
  const { handleCancel, handleConfirm } = useDialog();
  const [image, setImage] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const req = async () => {
      try {
        setIsFetching(true);
        const res = await API.removebg({ link });
        setImage(res);
        setIsFetching(false);
        setLimit(res.limit);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    req();
  }, []);

  const submit = () => {
    setValue(image);
  };

  const cancel = () => {
    return new Promise((res, rej) => {
      const req = async () => {
        try {
          res(await API.deleteFile("products", image.filename));
        } catch (error) {
          rej("gagal delete file");
        }
      };
      req();
    });
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
            setIsFetching(true);
            console.log(await cancel());
            setIsFetching(false);
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
