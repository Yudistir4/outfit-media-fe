import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import useDialog from "../../hooks/useDialog";
import API from "../../services";
import { v4 as uuidv4 } from "uuid";

// import { products } from "../../constants/dummy";

const SearchProduct = ({ setValue }) => {
  const [input, setInput] = useState();
  const [products, setProducts] = useState();
  const [selected, setSelected] = useState();
  const { handleCancel, handleConfirm } = useDialog();

  console.log(selected);
  useEffect(() => {
    const search = setTimeout(async () => {
      try {
        const res = await API.getProducts({ productName: input });
        setProducts(res);
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    }, 1000);

    return () => {
      clearTimeout(search);
    };
  }, [input]);

  const search = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  };

  const submit = () => {
    const result = products.docs.filter((item) => item.id === selected)[0];
    result.id = uuidv4();
    result.img.id = "img" + uuidv4();
    result.logo.id = "logo" + uuidv4();
    result.price.id = "price" + uuidv4();

    setValue(result);
  };

  return (
    <>
      <div className="flex flex-col justify-center">
        <input
          onChange={search}
          type="search"
          className="relative flex-auto min-w-0 block w-full px-5 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon3"
        />

        <div className="grid grid-cols-3 md:grid-cols-4 w-full mt-5 gap-5">
          {products &&
            products.docs.length !== 0 &&
            products.docs.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelected(item.id);
                  console.log("selec");
                }}
                className={`${
                  selected === item.id
                    ? "shadow-xl border-4 border-blue-400"
                    : "border-gray-300 border"
                }  transition-all cursor-pointer  hover:shadow-xl hover:border-4 transition-all hover:border-blue-400 flex flex-col rounded-lg  border-solid aspect-[3/4] overflow-hidden`}
              >
                <img
                  className="w-full  h-[70%] object-cover"
                  src={item.img.link}
                  alt=""
                />
                <div className="flex h-full justify-center flex-col items-center">
                  <div className="">{item.productName}</div>
                  <div className="font-bold">{item.price.text}</div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex w-full mt-5 gap-3">
          <Button
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
            fullWidth
            variant="contained"
            color="primary"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
