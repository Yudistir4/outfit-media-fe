import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import IconButton from "@mui/material/IconButton";
import { Controller } from "react-hook-form";

const InputImage = ({ control, setImage, nameOrId, btn, icon, position }) => {
  const handleChange = (e) => {
    if (setImage) {
      e.target.files.length > 0 && setImage(e.target.files[0]);
    }
  };
  function getImage(file) {
    const url = URL.createObjectURL(file);
    return new Promise((res) => {
      var image = new Image();
      image.src = url;
      image.onload = function () {
        let nilai;
        if (position === "displayImg") nilai = { size: 100, x: 50, y: 50 };
        if (position === "product1") nilai = { size: 20, x: 81.435, y: 17.2 };
        if (position === "product2") nilai = { size: 20, x: 81.435, y: 50.5 };
        if (position === "product3") nilai = { size: 20, x: 81.435, y: 83.8 };
        // let pembagi =
        //   (image.width > image.height ? image.width : image.height) / 100;

        // var result = {
        //   link: url,
        //   width: image.width / pembagi,
        //   height: image.height / pembagi,
        //   x: 50 - image.width / pembagi / 2,
        //   y: 50 - image.height / pembagi / 2,
        // };
        let pembagi =
          (image.width > image.height ? image.width : image.height) /
          nilai.size;

        var result = {
          link: url,
          width: image.width / pembagi,
          height: image.height / pembagi,
          x: nilai.x - image.width / pembagi / 2,
          y: nilai.y - image.height / pembagi / 2,
        };
        console.log(result);
        res(result);
      };
    });
  }
  return (
    <>
      <Controller
        name={nameOrId}
        control={control}
        render={({
          field: { onChange, value, ref },
          // fieldState: { error },
          // formState,
        }) => (
          <>
            <input
              style={{ display: "none" }}
              type="file"
              id={nameOrId}
              accept="image/png, image/gif, image/jpeg"
              // value={value.filename}
              onChange={async (e) => {
                const elementProps = await getImage(e.target.files[0]);
                // console.log("value :", value);
                if (e.target.files.length > 0) {
                  value.imgFromShopee = false;
                  onChange({
                    ...value,
                    file: e.target.files[0],
                    ...elementProps,
                  });
                  handleChange(e);
                }
              }}
            />
            <label htmlFor={nameOrId}>
              <IconButton aria-label="" component="span" ref={ref} {...btn}>
                {icon && icon}
                {!icon && <CameraAltIcon />}
              </IconButton>
            </label>
          </>
        )}
      />
    </>
  );
};

export default InputImage;

/* <input
        style={{ display: "none" }}
        type="file"
        id={id}
        {...register(name, {
          onChange: (e) =>
            e.target.files.length > 0 && setImage(e.target.files[0]),
        })}
        accept="image/png, image/gif, image/jpeg"
      /> */
