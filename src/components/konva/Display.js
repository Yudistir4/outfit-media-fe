import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";

import { Template } from "../../constants/dummy";
import ImageCanvas from "./ImageCanvas";
import TextCanvas from "./TextCanvas";

const Dragable = ({ initPost, page = 1 }) => {
  console.log("V3 : ", initPost);
  const [post, setPost] = React.useState(initPost);
  const [template, setTemplate] = React.useState();
  console.log("POST :", post.products);
  // const postRef = useRef(initPost);
  // postRef.current = initPost;
  const [selectedId, selectShape] = React.useState(null);
  const stageRef = useRef();

  const [currentWidth, setCurrentWidth] = useState();
  const [cellSize, setCellSize] = useState();
  const cellSizeRef = useRef();
  const container = useRef();

  const deselect = () => selectShape(null);

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
  };

  const checkSize = (perbesar = false) => {
    // return new Promise((res) => {
    let width = container.current.offsetWidth;
    let cellSize = width / 100;
    let data;
    if (perbesar === true) {
      width = 2000;
      cellSize = 20;
    }
    cellSizeRef.current = cellSize;
    setCurrentWidth(width);
    setCellSize(cellSize);

    data = initPost;
    const convert = JSON.parse(JSON.stringify(data));

    console.log(convert.template);
    for (let i = 0; i < convert.displayImg.length; i++) {
      convert.displayImg[i] = convertToRealSize(convert.displayImg[i]);
    }
    for (let i = 0; i < convert.products.length; i++) {
      convert.products[i].img = convertToRealSize(convert.products[i].img);
      convert.products[i].price = convertToRealSize(convert.products[i].price);
      convert.products[i].logo = convertToRealSize(convert.products[i].logo);
    }
    setPost(convert);
    setTemplate(convertToRealSize(Template));
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
      {/* <div className="bg-blue-500 w-full md:flex-grow md:w-0 md:h-[90vh] md:max-w-[90vh] lg:w-[90vh]"> */}
      {/* <Grid item xs={toolbar !== false ? 10 : 12}> */}
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
            {template && (
              <ImageCanvas
                name={"template"}
                convertToPercentageSize={convertToPercentageSize}
                img={template.link}
                shapeProps={template}
              />
            )}
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
                            name={`products[${i}].img`}
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
                        {product.logo.link && (
                          <ImageCanvas
                            name={`products[${i}].logo`}
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
                        )}
                        <TextCanvas
                          name={`products[${i}].price`}
                          convertToPercentageSize={convertToPercentageSize}
                          shapeProps={product.price}
                          isSelected={product.price.id === selectedId}
                          onSelect={() => {
                            if (product.price.id) selectShape(product.price.id);
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
      {/* </Grid> */}
      {/* </div> */}
    </>
  );
};

export default Dragable;
