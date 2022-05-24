import { Controller } from "react-hook-form";
import Input from "@mui/material/Input";
import React from "react";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SearchProductByLink from "./SearchProductByLink";
import useDialog from "../../hooks/useDialog";
import { useSnackbar } from "notistack";
import API from "../../services";
import { AiOutlineLink } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";

const InputLink = ({ name, control, setValue, setImage, urutanArray }) => {
  const { createDialog } = useDialog();

  const { enqueueSnackbar } = useSnackbar();

  const shortLink = async (originUrl) => {
    try {
      const res = await API.getShortLink({ originUrl });
      console.log(res);
      setValue(
        `content.reviewOutfit.products[${urutanArray}].shortLink`,
        res.shortLink
      );
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error Short Link", { variant: "error" });
    }
  };

  const searchProduct = (link) => {
    if (!link) return enqueueSnackbar("Link Kosong", { variant: "error" });
    console.log("Link: ", link);
    createDialog({
      title: "Search Product",
      allowClose: false,
      contentWithButton: (
        <SearchProductByLink
          link={link}
          setValue={(value) => {
            console.log(value);
            value.name &&
              setValue(
                `content.reviewOutfit.products[${urutanArray}].productName`,
                value.name
              );
            value.price &&
              setValue(
                `content.reviewOutfit.products[${urutanArray}].price.text`,
                value.price
              );
            if (value.link) {
              setValue(
                `content.reviewOutfit.products[${urutanArray}].img.link`,
                value.link
              );
              setValue(
                `content.reviewOutfit.products[${urutanArray}].img.imgFromShopee`,
                true
              );
              setValue(
                `content.reviewOutfit.products[${urutanArray}].img.width`,
                20
              );
              setValue(
                `content.reviewOutfit.products[${urutanArray}].img.height`,
                20
              );
            }
          }}
        />
      ),
    })
      .then(() => {
        console.log("confirm");
        setImage(Math.random());
      })
      .catch(() => console.log("cancelation"));
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <FormControl sx={{ width: "100%" }} variant="standard" size="small">
          <InputLabel htmlFor="outlined-adornment-password">Link</InputLabel>
          <Input
            size="small"
            id="standard-adornment-password"
            className="scroll-hidden"
            inputRef={ref}
            value={value}
            onChange={onChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => shortLink(value)}
                  edge="end"
                >
                  <AiOutlineLink />
                </IconButton>
                <a
                  className="p-[5px] hover:bg-gray-100 rounded-full cursor-pointer"
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                >
                  <BiLinkExternal />
                </a>
                <button
                  type="button"
                  className="p-[5px] hover:bg-gray-100 rounded-full cursor-pointer"
                  onClick={() => searchProduct(value)}
                >
                  <IoMdSearch />
                </button>
              </InputAdornment>
            }
            label="Link"
          />
        </FormControl>
      )}
    />
  );
};

export default InputLink;
