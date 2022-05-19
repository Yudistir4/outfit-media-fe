import CameraAltIcon from "@mui/icons-material/CameraAlt";
import IconButton from "@mui/material/IconButton";
import { Controller } from "react-hook-form";
import React from "react";

const InputImage = ({ control, setImage, nameOrId, btn, icon }) => {
  const handleChange = (e) => {
    if (setImage) {
      e.target.files.length > 0 && setImage(e.target.files[0]);
    }
  };
  return (
    <>
      <Controller
        name={nameOrId}
        control={control}
        render={({
          field: {
            onChange,
            //  value,
            ref,
          },
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
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  onChange(e.target.files[0]);
                  handleChange(e);
                }
              }}
            />
            {!btn === "none" && (
              <label htmlFor={nameOrId}>
                <IconButton aria-label="" component="span" ref={ref} {...btn}>
                  {icon && icon}
                  {!icon && <CameraAltIcon />}
                </IconButton>
              </label>
            )}
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
