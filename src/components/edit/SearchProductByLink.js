import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import useDialog from "../../hooks/useDialog";
import API from "../../services";

// import { product } from "../../constants/dummy";

const SearchProduct = ({ setValue, link }) => {
  console.log("your Link: ", link);
  const [product, setProduct] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [selected, setSelected] = useState({
    price: { id: "", data: "" },
    name: { id: "", data: "" },
    image: { id: "", data: "" },
  });
  const { handleCancel, handleConfirm } = useDialog();

  const changeSelected = (type, id, data) => {
    setSelected((prev) => {
      prev[type].id = id;
      prev[type].data = data;
      return { ...prev };
    });
    console.log(selected.name.id === "name" ? "true" : false);
    console.log(selected);
  };
  useEffect(() => {
    const search = async () => {
      try {
        setIsFetching(true);
        const res = await API.getShopee({ link });
        setIsFetching(false);
        setProduct(res);
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    search();
  }, [link]);

  const submit = () => {
    // const result = product.docs.filter((item) => item.id === selected)[0];
    // result.id = uuidv4();
    // result.img.id = "img" + uuidv4();
    // result.logo.id = "logo" + uuidv4();
    // result.price.id = "price" + uuidv4();
    setValue({
      name: selected.name.data,
      price: selected.price.data,
      link: selected.image.data,
    });
  };

  return (
    <>
      <div className="flex flex-col  ">
        {product && (
          <div className="flex flex-col space-y-2 overflow-y-auto max-h-[60vh]">
            <div className="flex">
              <div className="mr-3">Name</div>
              <div
                onClick={() => changeSelected("name", "name", product.name)}
                className={`${
                  selected.name.id === "name"
                    ? "bg-blue-500 text-white  "
                    : " bg-gray-200 text-gray-700 "
                }  hover:bg-blue-500 hover:text-white  cursor-pointer  px-3 py-1 rounded-full transition-all`}
              >
                {product.name}
              </div>
            </div>
            <div className="flex">
              <div className="mr-5">Price</div>
              {product.price_min === product.price_max && (
                <div
                  onClick={() =>
                    changeSelected("price", "price", product.price)
                  }
                  className={`${
                    selected.price.id === "price"
                      ? "bg-blue-500 text-white  "
                      : "bg-gray-200 text-gray-700 "
                  }  hover:bg-blue-500 hover:text-white cursor-pointer   px-3 py-1 rounded-full transition-all`}
                >
                  {product.price}
                </div>
              )}
              {product.price_min !== product.price_max && (
                <>
                  <div
                    onClick={() =>
                      changeSelected("price", "price_min", product.price_min)
                    }
                    className={`${
                      selected.price.id === "price_min"
                        ? "bg-blue-500 text-white  "
                        : " bg-gray-200 text-gray-700 "
                    }  hover:bg-blue-500 hover:text-white cursor-pointer px-3 py-1 rounded-full transition-all`}
                  >
                    {product.price_min}
                  </div>
                  <div
                    onClick={() =>
                      changeSelected("price", "price_max", product.price_max)
                    }
                    className={`${
                      selected.price.id === "price_max"
                        ? "bg-blue-500 text-white  "
                        : " bg-gray-200 text-gray-700 "
                    }  hover:bg-blue-500 hover:text-white cursor-pointer px-3 py-1 rounded-full transition-all`}
                  >
                    {product.price_max}
                  </div>
                </>
              )}
            </div>
            <div className="">Image</div>
            <div className="grid grid-cols-5 md:grid-cols-5 w-full mt-5 gap-3">
              {product.displayImages.map((value, i) => (
                <img
                  key={i}
                  onClick={() =>
                    changeSelected("image", "displayImage" + i, value.url)
                  }
                  className={`${
                    selected.image.id === "displayImage" + i &&
                    "border-blue-500 border-4"
                  } cursor-pointer aspect-square transition-all w-full object-cover rounded-md mb-1 hover:border-blue-500 hover:border-4 hover:border-solid`}
                  src={value.url}
                  alt=""
                />
              ))}
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 w-full gap-3">
              {product.models.map((value, i) => (
                <div
                  key={i}
                  className={`${
                    value.stock == 0 && "opacity-40"
                  }  hover:shadow-xl p-2 flex flex-col rounded-lg border border-gray-300 border-solid overflow-hidden`}
                >
                  <button
                    onClick={() => {
                      changeSelected("name", "modelsName" + i, value.name);
                      changeSelected("price", "modelsPrice" + i, value.price);
                      if (value.url)
                        changeSelected("image", "modelsImage" + i, value.url);
                    }}
                    className=" bg-blue-500 hover:bg-blue-400 text-white rounded-full mb-2 transition-all"
                  >
                    PICK ALL
                  </button>
                  {value.url && (
                    <img
                      onClick={() =>
                        changeSelected("image", "modelsImage" + i, value.url)
                      }
                      className={`${
                        selected.image.id === "modelsImage" + i &&
                        "border-blue-500 border-4"
                      } cursor-pointer transition-all w-full object-cover rounded-md mb-1 hover:border-blue-500 hover:border-4 hover:border-solid`}
                      src={value.url}
                      alt=""
                    />
                  )}
                  <div className="flex h-full justify-center flex-col items-center space-y-1">
                    <div
                      onClick={() =>
                        changeSelected("name", "modelsName" + i, value.name)
                      }
                      className={`${
                        selected.name.id === "modelsName" + i
                          ? "bg-blue-500 text-white"
                          : " bg-gray-200 text-gray-700"
                      }  text-center hover:bg-blue-500 hover:text-white cursor-pointer px-3 py-1 rounded-full transition-all`}
                    >
                      {value.name}
                    </div>
                    <div
                      onClick={() =>
                        changeSelected("price", "modelsPrice" + i, value.price)
                      }
                      className={`${
                        selected.price.id === "modelsPrice" + i
                          ? "bg-blue-500 text-white"
                          : " bg-gray-200 text-gray-700"
                      } hover:bg-blue-500 hover:text-white cursor-pointer px-3 py-1 rounded-full transition-all`}
                    >
                      {value.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isFetching && (
          <div className="animate-pulse flex flex-col space-y-2 overflow-y-auto max-h-[60vh]">
            <div className="flex">
              <div className="mr-3">Name</div>
              <div className="bg-gray-200 px-3 py-1 rounded-full w-full"></div>
            </div>
            <div className="flex">
              <div className="mr-5">Price</div>
              <div className="bg-gray-200 px-3 py-1 rounded-full w-full"></div>
            </div>
            <div className="">Image</div>
            <div className="grid grid-cols-5 md:grid-cols-5 w-full mt-5 gap-3">
              <div className="cursor-pointer aspect-square bg-gray-200 rounded-md mb-1"></div>
              <div className="cursor-pointer aspect-square bg-gray-200 rounded-md mb-1"></div>
              <div className="cursor-pointer aspect-square bg-gray-200 rounded-md mb-1"></div>
              <div className="cursor-pointer aspect-square bg-gray-200 rounded-md mb-1"></div>
              <div className="cursor-pointer aspect-square bg-gray-200 rounded-md mb-1"></div>
            </div>

            <div className="grid grid-cols-3 w-full gap-3">
              <div className="p-2 flex flex-col rounded-lg border border-gray-200 border-solid overflow-hidden">
                <button className="bg-gray-200 w-full rounded-full mb-2 h-10"></button>
                <div className="w-full h-full aspect-square bg-gray-200 rounded-md"></div>
                <div className="flex mt-1 justify-center flex-col items-center space-y-1">
                  <div className="bg-gray-200 w-full h-5 rounded-full"></div>
                  <div className="bg-gray-200 w-full h-5 rounded-full"></div>
                </div>
              </div>
              <div className="p-2 flex flex-col rounded-lg border border-gray-200 border-solid overflow-hidden">
                <button className="bg-gray-200 w-full rounded-full mb-2 h-10"></button>
                <div className="w-full h-full aspect-square bg-gray-200 rounded-md"></div>
                <div className="flex mt-1 justify-center flex-col items-center space-y-1">
                  <div className="bg-gray-200 w-full h-5 rounded-full"></div>
                  <div className="bg-gray-200 w-full h-5 rounded-full"></div>
                </div>
              </div>
              <div className="p-2 flex flex-col rounded-lg border border-gray-200 border-solid overflow-hidden">
                <button className="bg-gray-200 w-full rounded-full mb-2 h-10"></button>
                <div className="w-full h-full aspect-square bg-gray-200 rounded-md"></div>
                <div className="flex mt-1 justify-center flex-col items-center space-y-1">
                  <div className="bg-gray-200 w-full h-5 rounded-full"></div>
                  <div className="bg-gray-200 w-full h-5 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
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
