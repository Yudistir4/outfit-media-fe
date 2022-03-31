import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Text } from "react-konva";

import ImageCanvas from "./ImageCanvas";

import Button from "@mui/material/Button";
import example1 from "../../assets/example1.png";
import logo from "../../assets/logo.jpg";
// import template from "../../assets/template.png";
import kaos from "../../assets/kaos.png";
// import celana from "../../assets/celana.jpg";
// import sepatu from "../../assets/sepatu.png";
import templateProduct from "../../assets/template-with-product.png";

const initProducts = [
  {
    id: 1,
    halaman: 1,
    productName: "Nike AF1",
    linkAffiliate: "",
    price: {
      id: "awsd",
      text: 100.0,
      x: 65,
      y: 0,
      width: 10,
      height: 10,
      draggable: true,
    },
    img: {
      id: "awsda",
      link: kaos,
      x: 65,
      y: 0,
      width: 10,
      height: 10,
      draggable: true,
    },
    logo: {
      id: "awsdd",
      link: logo,
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      draggable: true,
    },
  },
];

const initialRectangles = [
  {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    img: example1,
    id: "rect1",
    draggable: true,
  },
  //   {
  //     x: 65,
  //     y: 0,
  //     width: 33.3,
  //     height: 100,
  //     img: template,
  //     draggable: false,
  //     //     id: "rect2",
  //   },
  {
    x: 60,
    y: 0,
    width: 40,
    height: 100,
    img: templateProduct,
    draggable: false,
    //     id: "rect2",
  },
  {
    x: 78.5,
    y: 1.3,
    width: 6,
    height: 6,
    img: logo,
    draggable: true,
    id: "logo1",
  },
  {
    x: 78.5,
    y: 35,
    width: 6,
    height: 6,
    img: logo,
    draggable: true,
    id: "logo2",
  },
  {
    x: 78.5,
    y: 69,
    width: 6,
    height: 6,
    img: logo,
    draggable: true,
    id: "logo3",
  },
  //   {
  //     x: 150,
  //     y: 150,
  //     width: 100,
  //     height: 100,
  //     //     fill: "green",
  //     id: "rect2",
  //   },
];

const Dragable = () => {
  const [rectangles, setRectangles] = React.useState();
  const [products, setProducts] = React.useState(initProducts);
  const [selectedId, selectShape] = React.useState(null);
  const elementRef = useRef(initialRectangles);
  const productsRef = useRef(initProducts);
  const stageRef = useRef();

  const [currentWidth, setCurrentWidth] = useState();
  const [cellSize, setCellSize] = useState();
  const container = useRef();

  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    downloadURI(uri, "stage.png");
  };

  const deselect = () => selectShape(null);

  // 64.69
  //86.09
  const handleMiddle = () => {
    const selectElement = rectangles.map((item) => {
      if (item.id === selectedId) {
        return { ...item, x: 78.5 * cellSize };
      } else {
        return item;
      }
    });
    setRectangles(selectElement);
    console.log("select : ", selectElement);
    selectElement.x = 50;

    //     const rects = rectangles.slice();
    //     rects[i] = newAttrs;
    //     setRectangles(rects);
  };

  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const convertToPercentageSize = (item) => {
    return {
      ...item,
      x: item.x / cellSize,
      y: item.y / cellSize,
      width: item.width / cellSize,
      height: item.height / cellSize,
    };
  };

  const updateRef = (index, newAttrs) => {
    elementRef.current[index].x = newAttrs.x / cellSize;
    elementRef.current[index].y = newAttrs.y / cellSize;
    elementRef.current[index].width = newAttrs.width / cellSize;
    elementRef.current[index].height = newAttrs.height / cellSize;
  };

  const updateProductsRef = (index, newAttrs, properti) => {
    convertToPercentageSize(newAttrs);
    productsRef.current[index][properti] = convertToPercentageSize(newAttrs);
    //     productsRef.current[index].img.x = newAttrs.x / cellSize;
    //     productsRef.current[index].img.y = newAttrs.y / cellSize;
    //     productsRef.current[index].img.width = newAttrs.width / cellSize;
    //     productsRef.current[index].img.height = newAttrs.height / cellSize;
  };
  // ---------

  const checkSize = () => {
    const width = container.current.offsetWidth;
    const cellSize = width / 100;
    setCurrentWidth(width);
    setCellSize(cellSize);

    console.log("cellsize : ", cellSize);
    //     debugger;

    const convertToRealSize = (item) => {
      return {
        ...item,
        x: item.x * cellSize,
        y: item.y * cellSize,
        width: item.width * cellSize,
        height: item.height * cellSize,
      };
    };

    setRectangles(initialRectangles.map((item) => convertToRealSize(item)));
    const result = products.map((product) => {
      return {
        ...product,
        logo: convertToRealSize(product.logo),
        img: convertToRealSize(product.img),
        price: convertToRealSize(product.price),
      };
    });
    console.log("resul : ", result);
    setProducts(result);
    //     setProducts(convertToRealSize(initialRectangles));

    console.log(width);
  };

  useEffect(() => {
    checkSize();
    window.addEventListener("resize", checkSize);
    window.addEventListener("dblclick", deselect);

    return () => {
      window.removeEventListener("resize", checkSize);
      window.removeEventListener("dblclick", deselect);
    };
  }, []);

  return (
    <div style={{ width: "100%", border: "1px solid red" }} ref={container}>
      <Button variant="text" color="primary" onClick={handleExport}>
        Download
      </Button>

      <Button variant="text" color="primary" onClick={handleMiddle}>
        Select
      </Button>
      <Stage
        width={currentWidth}
        height={currentWidth}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        ref={stageRef}
      >
        <Layer>
          {/* {currentWidth &&
            cellSize &&
            rectangles.map((rect, i) => {
              return (
                <ImageCanvas
                  key={i}
                  img={rect.img}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    if (rect.id) selectShape(rect.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = rectangles.slice();
                    rects[i] = newAttrs;
                    setRectangles(rects);
                    updateRef(i, newAttrs);
                  }}
                />
              );
            })} */}
          {currentWidth &&
            cellSize &&
            products.map((product, i) => {
              return (
                <React.Fragment key={i}>
                  <ImageCanvas
                    img={product.img.link}
                    shapeProps={product.img}
                    isSelected={product.img.id === selectedId}
                    onSelect={() => {
                      if (product.img.id) selectShape(product.img.id);
                    }}
                    onChange={(newAttrs) => {
                      setProducts((prev) => {
                        prev[i].img = newAttrs;
                        return [...prev];
                      });
                      updateProductsRef(i, newAttrs, "img");
                    }}
                  />
                  <ImageCanvas
                    img={product.logo.link}
                    shapeProps={product.logo}
                    isSelected={product.logo.id === selectedId}
                    onSelect={() => {
                      if (product.logo.id) selectShape(product.logo.id);
                    }}
                    onChange={(newAttrs) => {
                      setProducts((prev) => {
                        prev[i].logo = newAttrs;
                        return [...prev];
                      });
                      updateProductsRef(i, newAttrs, "logo");
                    }}
                  />
                </React.Fragment>
              );
            })}
          <Text text="Assa" fontSize={5 * cellSize}></Text>
        </Layer>
      </Stage>
    </div>
  );
};

export default Dragable;
