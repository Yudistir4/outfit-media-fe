import React from "react";
import { position } from "../../constants/dummy";
import logo from "../../assets/logo.jpg";
import DeleteIcon from "@mui/icons-material/Delete";
import Input from "../../core/input/Input";
import InputImage from "../konva/InputImage";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

const Products = ({ control, page, setValue, watch, products, setImage }) => {
  // let products = useWatch({ control, name: `products` });

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
    products.push({
      id: "p" + Math.floor(Math.random() * 100),
      halaman: page,
      urutan,
      productName: "Sepatu Nike AF1",
      linkAffiliate: "",
      linkNo: "",
      price: {
        id: "price" + Math.floor(Math.random() * 100),
        text: "Rp",
        x: position[urutan - 1].price.x,
        y: position[urutan - 1].price.y,
        fontSize: 3,
        width: 25,
        height: 3,
        draggable: true,
      },
      img: {
        id: "img" + Math.floor(Math.random() * 100),
        link: null,
        x: 71.435,
        y: 53.8,
        width: 20,
        height: 20,
        draggable: true,
      },
      logo: {
        username: "karungjantan",
        id: "logo" + Math.floor(Math.random() * 100),
        link: logo,
        x: position[urutan - 1].logo.x,
        y: position[urutan - 1].logo.y,
        width: 6,
        height: 6,
        draggable: true,
      },
    });

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
                <IconButton onClick={() => deleteProduct(item.id)}>
                  <DeleteIcon />
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
              <Input
                label="Link affiliate"
                name={`products[${i}].linkAffiliate`}
                control={control}
                variant="standard"
                fullWidth
                placeholder="Link"
              />
              <Input
                label="Username"
                name={`products[${i}].logo.username`}
                control={control}
                variant="standard"
                fullWidth
                placeholder="Username"
              />
              <Input
                label="Link No"
                name={`products[${i}].linkNo`}
                control={control}
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
