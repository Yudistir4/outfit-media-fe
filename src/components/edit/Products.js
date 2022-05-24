import React from "react";
import { generateProduct, generatePosition } from "../../constants/dummy";
import InputLogo from "./InputLogo";
import InputLink from "./InputLink";
import InputShortLink from "./InputShortLink";
import DeleteIcon from "@mui/icons-material/Delete";
import Input from "../../core/input/Input";
import InputImage from "../konva/InputImage";
import { saveAs } from "file-saver";
import API from "../../services";
import useDialog from "../../hooks/useDialog";
import SearchProduct from "./SearchProduct";
import SaveIcon from "@mui/icons-material/Save";

import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useSnackbar } from "notistack";

const Products = ({ control, page, setValue, watch, products, setImage }) => {
  // let products = useWatch({ control, name: `products` });

  //  saveAs(link, filename || "image.jpg")
  console.log(products);
  const { createDialog } = useDialog();

  const { enqueueSnackbar } = useSnackbar();
  const searchProduct = (name, dataBefore, urutan) => {
    createDialog({
      title: "Search Product",
      contentWithButton: (
        <SearchProduct
          setValue={(value) =>
            setValue(name, {
              ...dataBefore,
              ...generatePosition(value, urutan),
            })
          }
        />
      ),
    })
      .then(() => {
        console.log("confirm");
        setImage(Math.random());
      })
      .catch(() => console.log("cancelation"));
  };

  const saveProduct = async (product) => {
    console.log(product);
    try {
      if (product.img.file) {
        console.log(true);
        const { filename, url } = await API.uploadFile(
          product.img.file,
          "products"
        );
        product.img.filename = filename;
        product.img.link = url;
        delete product.img.file;
      }

      console.log("berhasil : ", await API.createProduct(product));
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = () => {
    let products = watch("content.reviewOutfit.products");
    let urutanProducts = products
      .filter((item) => item.halaman === page)
      .map((item) => item.urutan);

    let urutan;
    for (let i = 1; i <= urutanProducts.length + 1; i++) {
      let check = urutanProducts.includes(i);
      if (!check) urutan = i;
    }

    // for()
    // let productsPage
    console.log("URUTAN : ", urutan);
    products.push(generateProduct(page, urutan));
    setValue("content.reviewOutfit.products", products);
  };

  const deleteProduct = (id) => {
    let products = watch("content.reviewOutfit.products");
    setValue(
      "content.reviewOutfit.products",
      products.filter((item) => item.id !== id)
    );
  };
  const copy = [...products];
  const productsList = copy
    .map((item, i) => {
      if (item.halaman === page) {
        return {
          urutan: item.urutan,
          elem: (
            <div
              key={i + item.id}
              className="flex rounded-lg justify-center items-center flex-col space-y-2 border-gray-200 p-3 border-2 "
            >
              <Typography variant="body1" color="initial">
                Product {item.urutan}
              </Typography>
              <div className="flex">
                <InputImage
                  control={control}
                  nameOrId={`content.reviewOutfit.products[${i}].img`}
                  position={`product${item.urutan}`}
                  setImage={setImage}
                />
                <IconButton
                  onClick={() => {
                    if (!item.img.link) {
                      return enqueueSnackbar("NO IMG", { variant: "error" });
                    }
                    if (!item.img.file) {
                      API.DownloadFileFirebase(
                        item.img.link,
                        item.img.filename || "image.jpg"
                      );
                    } else {
                      saveAs(item.img.link, item.img.filename || "image.jpg");
                    }
                  }}
                >
                  <ArrowDownwardIcon />
                </IconButton>
                <IconButton onClick={() => deleteProduct(item.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={() =>
                    searchProduct(
                      `content.reviewOutfit.products[${i}]`,
                      item,
                      item.urutan
                    )
                  }
                >
                  <SearchIcon />
                </IconButton>
                <IconButton disabled onClick={() => saveProduct(item)}>
                  <SaveIcon />
                </IconButton>
              </div>

              <Input
                label="Product Name"
                name={`content.reviewOutfit.products[${i}].productName`}
                control={control}
                variant="standard"
                fullWidth
                placeholder="Nama Product"
              />
              <Input
                label="Price"
                name={`content.reviewOutfit.products[${i}].price.text`}
                control={control}
                variant="standard"
                fullWidth
                placeholder="Price"
                currency
              />

              <InputLogo
                name={`content.reviewOutfit.products[${i}].logo.username`}
                control={control}
                setValue={setValue}
                urutan={item.urutan}
                setImage={setImage}
              />
              <InputLink
                // label="Link affiliate"
                name={`content.reviewOutfit.products[${i}].linkAffiliate`}
                control={control}
                urutanArray={i}
                setValue={setValue}
                // variant="standard"
                // fullWidth
                setImage={setImage}
                placeholder="Link"
              />
              <InputShortLink
                name={`content.reviewOutfit.products[${i}].shortLink`}
                control={control}
                watch={watch}
              />
              <Input
                label="Link No"
                name={`content.reviewOutfit.products[${i}].linkNo`}
                control={control}
                type="number"
                variant="standard"
                fullWidth
                placeholder="Link No"
              />
            </div>
          ),
        };
      }
    })
    .filter((item) => item !== undefined)
    .sort((a, b) => a.urutan - b.urutan)
    .map((item) => item.elem);

  // console.log(panjang);

  return (
    <>
      {productsList}
      {productsList.length < 3 && (
        <Button
          variant="contained"
          color="success"
          onClick={() => addProduct(productsList.length + 1)}
        >
          ADD PRODUCT
        </Button>
      )}
    </>
  );
};

export default Products;
