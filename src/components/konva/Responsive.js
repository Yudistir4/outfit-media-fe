import React, { Component, useState, useEffect, useRef } from "react";
// import Konva from "konva";
// import { render } from "react-dom";
import { Stage, Layer, Circle, Image } from "react-konva";
import useImage from "use-image";
import templateImg from "../../assets/template.png";

const Picture = ({ currentWidth, cellSize, img, shapeProps }) => {
  let shapeRef = useRef(shapeProps);
  Object.keys(shapeProps).map(function (key, index) {
    shapeProps[key] *= cellSize;
  });
  console.log("HAHAHA: ", shapeProps);
  const [image] = useImage(img);
  const [shape, setShape] = useState({
    isDragging: false,
    ...shapeProps,
    // x: x * cellSize || 0,
    // y: y * cellSize || 0,
  });
  console.log(shape);

  useEffect(() => {
    if (!shape.isDragging && !shape.isResize) {
      shapeRef.current = {
        x: shape.x / cellSize,
        y: shape.y / cellSize,
        width: shape.width / cellSize,
        height: shape.height / cellSize,
      };
      console.log(shapeRef.current);
    }
  }, [shape]);

  useEffect(() => {
    setShape({
      ...shape,
      x: shapeRef.current.x * cellSize,
      y: shapeRef.current.y * cellSize,
      width: shapeRef.current.width * cellSize,
      height: shapeRef.current.height * cellSize,
      isResize: true,
    });
  }, [currentWidth, cellSize]);

  return (
    <Image
      image={image}
      {...shape}
      draggable
      onDragStart={() => {
        setShape({
          ...shape,
          isDragging: true,
        });
      }}
      onDragEnd={(e) => {
        setShape({
          ...shape,
          isDragging: false,
          isResize: false,
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
    />
  );
};

const shape1 = {
  x: 50,
  y: 50,
  width: 50,
  height: 50,
};

const template = {
  x: 66,
  y: 0,
  width: 33.3,
  height: 100,
};

const Responsive = () => {
  const [currentWidth, setCurrentWidth] = useState();
  const [cellSize, setCellSize] = useState();
  const container = useRef();

  const checkSize = () => {
    const width = container.current.offsetWidth;
    setCurrentWidth(width);
    setCellSize(width / 100);
    console.log(width);
  };

  useEffect(() => {
    checkSize();
    window.addEventListener("resize", checkSize);

    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid red",
      }}
      ref={container}
    >
      {currentWidth && cellSize && (
        <Stage width={currentWidth} height={currentWidth}>
          <Layer>
            <Picture
              img="https://outfitstudio.site/img/1641314584_1f3c9969c1ef05e31c6a.jpg"
              currentWidth={currentWidth}
              cellSize={cellSize}
              shapeProps={shape1}
            />
            <Picture
              img={templateImg}
              currentWidth={currentWidth}
              cellSize={cellSize}
              shapeProps={template}
            />
          </Layer>
        </Stage>
      )}
    </div>
  );
};

export default Responsive;
