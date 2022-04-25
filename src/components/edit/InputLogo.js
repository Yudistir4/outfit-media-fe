import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import API from "../../services";
import { position } from "../../constants/dummy";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

let render = 0;
const SearchLogo = ({ name, control, setValue, urutan, setImage }) => {
  render++;
  console.log("render ke ", render);
  let username = useWatch({ control, name });
  const [logos, setLogos] = useState();
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);

  const setLogo = (value) => {
    for (let i = 0; i < 3; i++) {
      if (urutan === i + 1) {
        value.x = position[i].logo.x;
        value.y = position[i].logo.y;
      }
    }
    console.log(value);
    setValue(name.replace(".username", ""), value);
    setLogos(null);
    setImage(value.link);
  };

  useEffect(() => {
    const req = setTimeout(async () => {
      try {
        if (focus) {
          const res = await API.getLogos({ username });
          console.log(res);
          setLogos(res);
        }
      } catch (error) {
        console.log(error);
      }
    }, 500);

    return () => {
      clearTimeout(req);
    };
  }, [username, focus]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <div className="relative w-full">
          <TextField
            label="Username"
            variant="standard"
            fullWidth
            size="small"
            inputRef={ref}
            autoComplete="off"
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            onBlur={() => {
              if (!hover) {
                setFocus(false);
              }
              // setLogos(null)
            }}
            onFocus={() => setFocus(true)}
            value={value}
          />
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="absolute w-full bg-gray-700 z-10 rounded-md overflow-hidden"
          >
            {logos &&
              focus &&
              logos.docs.map((value) => (
                <div
                  key={value._id}
                  onClick={() => {
                    setLogo(value);
                    setHover(false);
                    setFocus(false);
                  }}
                  className="w-full h-12 flex items-center cursor-pointer hover:bg-gray-600 p-2 transition-all"
                >
                  <div className="flex-1 text-white">{value.username}</div>
                  <img
                    className="h-full bg-cover rounded-full"
                    src={value.link}
                    alt=""
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    />
  );
};

export default SearchLogo;
