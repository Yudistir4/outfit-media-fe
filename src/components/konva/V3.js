import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";

import ImageCanvas from "./ImageCanvas";
import TextCanvas from "./TextCanvas";

import Toolbar from "./Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

// import example1 from "../../assets/example1.png";
// import logo from "../../assets/logo.jpg";
// import template from "../../assets/template.png";
// import kaos from "../../assets/kaos.png";
// import celana from "../../assets/celana.jpg";
// import sepatu from "../../assets/sepatu.png";
// import templateProduct from "../../assets/template-with-product.png";

const Dragable = ({ initPost, control, setValue, page, watch, getValues }) => {
  console.log("V3 : ", initPost);
  const [post, setPost] = React.useState(initPost);
  console.log("POST :", post.products);
  // const postRef = useRef(initPost);
  // postRef.current = initPost;
  const [selectedId, selectShape] = React.useState(null);
  const stageRef = useRef();

  const [currentWidth, setCurrentWidth] = useState();
  const [cellSize, setCellSize] = useState();
  const cellSizeRef = useRef();
  const container = useRef();

  const handleDownload = async () => {
    await checkSize(true);
    await new Promise(async (res, rej) => {
      // setTimeout(() => {
      const uri = stageRef.current.toDataURL();
      downloadURI(uri, "stage.png");
      res();
      // }, 1000);
    });
    // const uri = stageRef.current.toDataURL();

    // await downloadURI(uri, "stage.png");

    // debugger;
    await checkSize();
  };

  const deselect = () => selectShape(null);

  const handleAlignCenter = () => {
    // 64.77
    // 98.1
    const t1 = (98.1 - 64.77) / 2;

    const displayImg = post.displayImg.map((item, i) => {
      if (item.id === selectedId) {
        let update = {
          ...item,
          x: (50 - item.width / cellSize / 2) * cellSize,
        };
        let updateConvert = convertToPercentageSize(update);

        // postRef.current.displayImg[i] = updateConvert;

        setValue(`displayImg[${i}].x`, updateConvert.x);
        setValue(`displayImg[${i}].y`, updateConvert.y);
        return update;
      } else {
        return item;
      }
    });

    const selectElement = post.products.map((item, i) => {
      if (item.img.id === selectedId) {
        const update = {
          ...item,
          img: {
            ...item.img,
            x: (64.77 + (t1 - item.img.width / cellSize / 2)) * cellSize,
          },
        };

        let updateConvert = convertToPercentageSize(update.img);
        setValue(`products[${i}].img.x`, updateConvert.x);
        setValue(`products[${i}].img.y`, updateConvert.y);
        // postRef.current.products[i].img = convertToPercentageSize(update.img);
        return update;
      } else if (item.logo.id === selectedId) {
        const update = {
          ...item,
          logo: {
            ...item.logo,
            x: (64.77 + (t1 - item.logo.width / cellSize / 2)) * cellSize,
          },
        };
        let updateConvert = convertToPercentageSize(update.logo);
        setValue(`products[${i}].logo.x`, updateConvert.x);
        setValue(`products[${i}].logo.y`, updateConvert.y);
        // postRef.current.products[i].logo = convertToPercentageSize(update.logo);
        return update;
      } else if (item.price.id === selectedId) {
        const update = {
          ...item,
          price: {
            ...item.price,
            x: (64.77 + (t1 - item.price.width / cellSize / 2)) * cellSize,
          },
        };
        let updateConvert = convertToPercentageSize(update.price);
        setValue(`products[${i}].price.x`, updateConvert.x);
        setValue(`products[${i}].price.y`, updateConvert.y);
        // postRef.current.products[i].price = convertToPercentageSize(
        //   update.price
        // );
        return update;
      } else {
        return item;
      }
    });

    setPost((prev) => {
      return { ...prev, displayImg, products: selectElement };
    });
  };

  function downloadURI(uri, name) {
    return new Promise((res) => {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      res();
    });
  }
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const convertToPercentageSize = (item) => {
    const newValue = { ...item };
    newValue.x = newValue.x / cellSize;
    newValue.y = newValue.y / cellSize;
    if (newValue.width) newValue.width = newValue.width / cellSize;
    if (newValue.height) newValue.height = newValue.height / cellSize;
    if (newValue.fontSize)
      newValue.fontSize = (newValue.fontSize || 0) / cellSize;
    return newValue;
    // return {
    //   ...item,
    //   x: item.x / cellSize,
    //   y: item.y / cellSize,
    //   width: item.width / cellSize,
    //   height: item.height / cellSize,
    //   fontSize: (item.fontSize || 0) / cellSize,
    // };
  };

  const convertToRealSize = (item) => {
    const newValue = { ...item };
    newValue.x = newValue.x * cellSizeRef.current;
    newValue.y = newValue.y * cellSizeRef.current;
    if (newValue.width) newValue.width = newValue.width * cellSizeRef.current;
    if (newValue.height)
      newValue.height = newValue.height * cellSizeRef.current;
    if (newValue.fontSize)
      newValue.fontSize = (newValue.fontSize || 0) * cellSizeRef.current;
    return newValue;
    // return {
    //   ...item,
    //   x: item.x * cellSize,
    //   y: item.y * cellSize,
    //   width: item.width * cellSize,
    //   height: item.height * cellSize,
    //   fontSize: (item.fontSize || 50) * cellSize,
    // };
  };
  const checkSize = (perbesar = false) => {
    // return new Promise((res) => {
    let width = container.current.offsetWidth;
    let cellSize = width / 100;
    let data;
    if (perbesar === true) {
      width = 1000;
      cellSize = 10;
      // data = watch();
    }
    // debugger;
    cellSizeRef.current = cellSize;
    setCurrentWidth(width);
    setCellSize(cellSize);
    // console.log("CHECK SIZE");

    data = getValues();
    // console.log("CHECK SIZE : ", data.products);
    const convert = JSON.parse(JSON.stringify(data));

    convert.template = convertToRealSize(convert.template);

    for (let i = 0; i < convert.displayImg.length; i++) {
      convert.displayImg[i] = convertToRealSize(convert.displayImg[i]);
    }
    for (let i = 0; i < convert.products.length; i++) {
      convert.products[i].img = convertToRealSize(convert.products[i].img);
      convert.products[i].price = convertToRealSize(convert.products[i].price);
      convert.products[i].logo = convertToRealSize(convert.products[i].logo);
    }
    setPost(convert);
    // res();
    // });
  };

  useEffect(() => {
    checkSize();
    window.addEventListener("resize", checkSize);
    window.addEventListener("dblclick", deselect);

    return () => {
      window.removeEventListener("resize", checkSize);
      window.removeEventListener("dblclick", deselect);
    };
  }, [initPost]);
  // debugger;
  return (
    <>
      <Grid item xs={2}>
        <Toolbar
          handleDownload={handleDownload}
          handleAlignCenter={handleAlignCenter}
        />
      </Grid>
      <Grid item xs={10}>
        <div style={{ width: "100%", border: "1px solid red" }} ref={container}>
          <Stage
            width={currentWidth}
            height={currentWidth}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            ref={stageRef}
          >
            <Layer>
              {post.displayImg[page - 1] && post.displayImg[page - 1].link && (
                <ImageCanvas
                  setValue={setValue}
                  control={control}
                  name={`displayImg[${page - 1}]`}
                  convertToPercentageSize={convertToPercentageSize}
                  img={post.displayImg[page - 1].link}
                  shapeProps={post.displayImg[page - 1]}
                  isSelected={post.displayImg[page - 1].id === selectedId}
                  onSelect={() => {
                    if (post.displayImg[page - 1].id)
                      selectShape(post.displayImg[page - 1].id);
                  }}
                  onChangeCanvas={(newAttrs) => {
                    console.log("Result ", newAttrs);
                    setPost((prev) => {
                      prev.displayImg[page - 1] = newAttrs;
                      return { ...prev };
                    });
                    // console.log(initPost.displayImg[0]);

                    // postRef.current.displayImg[page - 1] =
                    //   convertToPercentageSize(newAttrs);
                    // updatepostsRef(i, newAttrs, "template");
                  }}
                />
              )}

              <ImageCanvas
                setValue={setValue}
                name={"template"}
                control={control}
                convertToPercentageSize={convertToPercentageSize}
                img={post.template.link}
                shapeProps={post.template}
                isSelected={post.template.id === selectedId}
                onSelect={() => {
                  if (post.template.id) selectShape(post.template.id);
                }}
                onChangeCanvas={(newAttrs) => {
                  setPost((prev) => {
                    prev.template = newAttrs;
                    return { ...prev };
                  });
                  // postRef.current.template = convertToPercentageSize(newAttrs);

                  // updatepostsRef(i, newAttrs, "template");
                }}
              />
              {currentWidth &&
                cellSize &&
                post.products
                  .map((product, i) => {
                    console.log("item: ", i);
                    if (product.halaman === page) {
                      // debugger;
                      console.log("item: ", i);
                      return (
                        <React.Fragment key={i}>
                          {product.img.link && (
                            <ImageCanvas
                              setValue={setValue}
                              name={`products[${i}].img`}
                              control={control}
                              convertToPercentageSize={convertToPercentageSize}
                              img={product.img.link}
                              shapeProps={product.img}
                              isSelected={product.img.id === selectedId}
                              onSelect={() => {
                                if (product.img.id) selectShape(product.img.id);
                              }}
                              onChangeCanvas={(newAttrs) => {
                                setPost((prev) => {
                                  prev.products[i].img = newAttrs;
                                  return { ...prev };
                                });
                                // postRef.current.products[i].img =
                                //   convertToPercentageSize(newAttrs);
                                // console.log(postRef.current.products[i].img);

                                // updateProductsRef(i, newAttrs, "img");
                              }}
                            />
                          )}
                          <ImageCanvas
                            setValue={setValue}
                            name={`products[${i}].logo`}
                            control={control}
                            convertToPercentageSize={convertToPercentageSize}
                            img={product.logo.link}
                            shapeProps={product.logo}
                            isSelected={product.logo.id === selectedId}
                            onSelect={() => {
                              if (product.logo.id) selectShape(product.logo.id);
                            }}
                            onChangeCanvas={(newAttrs) => {
                              setPost((prev) => {
                                prev.products[i].logo = newAttrs;
                                return { ...prev };
                              });
                              // postRef.current.products[i].logo =
                              //   convertToPercentageSize(newAttrs);
                              // console.log(postRef.current.products[i].logo);
                              // console.log(postRef.current.products[i].logo);

                              // updateProductsRef(i, newAttrs, "img");
                            }}
                          />
                          <TextCanvas
                            control={control}
                            name={`products[${i}].price`}
                            setValue={setValue}
                            convertToPercentageSize={convertToPercentageSize}
                            shapeProps={product.price}
                            isSelected={product.price.id === selectedId}
                            onSelect={() => {
                              if (product.price.id)
                                selectShape(product.price.id);
                            }}
                            onChangeCanvas={(newAttrs) => {
                              setPost((prev) => {
                                prev.products[i].price = newAttrs;
                                return { ...prev };
                              });
                              // postRef.current.products[i].price =
                              //   convertToPercentageSize(newAttrs);
                              // console.log(postRef.current.products[i].logo);

                              // updateProductsRef(i, newAttrs, "img");
                            }}
                          />
                        </React.Fragment>
                      );
                    } else {
                      return null;
                    }
                  })
                  .filter((item) => item !== undefined)}
            </Layer>
          </Stage>
        </div>
      </Grid>
    </>
  );
};

export default Dragable;
