import React, { useState, useEffect, useRef } from "react";
// import Konva from "konva";
// import { render } from "react-dom";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import templateImg from "../../assets/template.png";

const Picture = ({
  currentWidth,
  cellSize,
  img,
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  let shapeRef1 = useRef(shapeProps);

  //   Object.keys(shapeProps).map(function (key) {
  //     shapeProps[key] *= cellSize;
  //   });
  console.log("HAHAHA: ", shapeProps);
  const [image] = useImage(img);
  const [shape, setShape] = useState({
    isDragging: false,
    ...shapeProps,

    x: shapeProps.x * cellSize || 0,
    y: shapeProps.y * cellSize || 0,
    width: shapeProps.width * cellSize || 0,
    height: shapeProps.height * cellSize || 0,
  });
  console.log(shape);

  useEffect(() => {
    if (!shape.isDragging && !shape.isResize) {
      shapeRef1.current = {
        x: shape.x / cellSize,
        y: shape.y / cellSize,
        width: shape.width / cellSize,
        height: shape.height / cellSize,
      };
      console.log(shapeRef1.current);
    }
  }, [shape]);

  useEffect(() => {
    setShape({
      ...shape,
      x: shapeRef1.current.x * cellSize,
      y: shapeRef1.current.y * cellSize,
      width: shapeRef1.current.width * cellSize,
      height: shapeRef1.current.height * cellSize,
      isResize: true,
    });
  }, [currentWidth, cellSize]);
  return (
    <>
      <Image
        image={image}
        {...shape}
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
          onChange({
            ...shape,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        // BATESSSS
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        draggable
        onTransformEnd={() => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shape,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
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

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 40,
    height: 40,
    //     fill: "red",
    id: "rect1",
  },
  {
    x: 20,
    y: 20,
    width: 20,
    height: 20,
    //     fill: "green",
    id: "rect2",
  },
];

const Responsive = () => {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [selectedId, selectShape] = React.useState(null);

  const [currentWidth, setCurrentWidth] = useState();
  const [cellSize, setCellSize] = useState();
  const container = useRef();

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

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
        <Stage
          width={currentWidth}
          height={currentWidth}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {rectangles.map((rect, i) => {
              return (
                <Picture
                  img="https://outfitstudio.site/img/1641314584_1f3c9969c1ef05e31c6a.jpg"
                  currentWidth={currentWidth}
                  cellSize={cellSize}
                  //    shapeProps={shape1}

                  key={i}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    selectShape(rect.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = rectangles.slice();
                    rects[i] = newAttrs;
                    setRectangles(rects);
                  }}
                />
              );
            })}
            {/* <Picture
              img="https://outfitstudio.site/img/1641314584_1f3c9969c1ef05e31c6a.jpg"
              currentWidth={currentWidth}
              cellSize={cellSize}
              shapeProps={shape1}

              
            /> */}
            {/* <Picture
              img={templateImg}
              currentWidth={currentWidth}
              cellSize={cellSize}
              shapeProps={template}
            /> */}
          </Layer>
        </Stage>
      )}
    </div>
  );
};

export default Responsive;
