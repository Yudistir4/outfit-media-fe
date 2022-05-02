import { useWatch } from "react-hook-form";
import { position } from "../../constants/dummy";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

const Tabbar = ({ setPage, page, setValue, control }) => {
  let products = useWatch({ control, name: `products` });
  let pageCount = useWatch({ control, name: `halaman` });
  console.log("TABBAR: ", products);
  const addPage = () => {
    for (let i = 0; i < 3; i++) {
      products.push({
        id: "p" + Math.floor(Math.random() * 100),
        halaman: pageCount + 1,
        urutan: i + 1,
        productName: "",
        linkAffiliate: "",
        linkNo: "",
        price: {
          id: "price" + Math.floor(Math.random() * 100),
          text: "Rp",
          x: position[i].price.x,
          y: position[i].price.y,
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
          username: "",
          id: "logo" + Math.floor(Math.random() * 100),
          link: null,
          x: position[i].logo.x,
          y: position[i].logo.y,
          width: 6,
          height: 6,
          draggable: true,
        },
      });
    }
    // debugger;
    setValue("products", products);

    setValue("halaman", pageCount + 1);
    setValue(`displayImg[${pageCount}]`, {
      id: "imgPost2",
      link: null,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      draggable: true,
    });
  };

  const List = [];
  for (let i = 0; i < pageCount; i++) {
    List.push(
      <button
        type="button"
        key={i}
        onClick={() => setPage(i + 1)}
        className={`${
          page === i + 1 ? "text-blue-500 bg-white" : "text-white"
        } shrink-0 h-9 w-10 transition-all hover:bg-white rounded-md flex justify-center  hover:text-blue-500`}
      >
        <span className="self-center">{i + 1}</span>
      </button>
    );
  }

  return (
    <div className="sticky top-0 lg:top-[56px] xl:top-0 z-10 p-1 bg-blue-500 rounded-md flex">
      <div className="gap-1 scroll-hidden w-[20%] overflow-x-auto scroll- flex flex-nowrap flex-1">
        {List}
      </div>
      <button
        type="button"
        onClick={addPage}
        className="group shrink-0 h-9 w-10 transition-all  bg-white rounded-md flex justify-center  text-blue-500"
      >
        <span className="self-center">
          <AddIcon className="group-hover:animate-ping" />
        </span>
      </button>
    </div>
  );
};

export default Tabbar;
