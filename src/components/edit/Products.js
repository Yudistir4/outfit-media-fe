import React from "react";
import { generateProduct, generatePosition } from "../../constants/dummy";
import InputLogo from "./InputLogo";
import InputLink from "./InputLink";
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

const Products = ({ control, page, setValue, watch, products, setImage }) => {
  // let products = useWatch({ control, name: `products` });

  //  saveAs(link, filename || "image.jpg")
  console.log(products);
  const { createDialog } = useDialog();

  const searchProduct = (name, dataBefore, urutan) => {
    createDialog({
      title: "Seacrh Product",
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
          "dummy"
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
    let products = watch("products");
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
    setValue("products", products);
  };

  const deleteProduct = (id) => {
    let products = watch("products");
    setValue(
      "products",
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
            <div key={i + item.id} className="product">
              <Typography variant="body1" color="initial">
                Product {item.urutan}
              </Typography>
              <div className="flex">
                <InputImage
                  control={control}
                  nameOrId={`products[${i}].img`}
                  position={`product${item.urutan}`}
                  setImage={setImage}
                />
                <IconButton
                  onClick={() =>
                    saveAs(item.img.link, item.img.name || "image.jpg")
                  }
                >
                  <ArrowDownwardIcon />
                </IconButton>
                <IconButton onClick={() => deleteProduct(item.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={() =>
                    searchProduct(`products[${i}]`, item, item.urutan)
                  }
                >
                  <SearchIcon />
                </IconButton>
                <IconButton onClick={() => saveProduct(item)}>
                  <SaveIcon />
                </IconButton>
              </div>

              <Input
                label="Product Name"
                name={`products[${i}].productName`}
                control={control}
                variant="standard"
                fullWidth
                placeholder="Nama Product"
              />
              <Input
                label="Price"
                name={`products[${i}].price.text`}
                control={control}
                variant="standard"
                fullWidth
                placeholder="Price"
              />

              <InputLogo
                name={`products[${i}].logo.username`}
                control={control}
                setValue={setValue}
                urutan={item.urutan}
                setImage={setImage}
              />
              <InputLink
                // label="Link affiliate"
                name={`products[${i}].linkAffiliate`}
                control={control}
                urutanArray={i}
                setValue={setValue}
                // variant="standard"
                // fullWidth
                setImage={setImage}
                placeholder="Link"
              />

              <Input
                label="Link No"
                name={`products[${i}].linkNo`}
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
