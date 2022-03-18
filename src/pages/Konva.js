import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Star, Text, Image } from "react-konva";
import useImage from "use-image";

import Responsive from "../components/konva/Responsive";
import Dragable from "../components/konva/Dragable";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

// const URLImage = ({ src, x, y }) => {
//   const imageRef = useRef(null);
//   const [image, setImage] = useState(null);

//   const loadImage = () => {
//     const img = new window.Image();
//     img.src = src;
//     img.crossOrigin = "Anonymous";
//     imageRef.current = img;
//     imageRef.current.addEventListener("load", handleLoad);
//   };

//   const handleLoad = () => {
//     setImage(imageRef.current);
//   };
// };

const LionImage = () => {
  const [image] = useImage("https://konvajs.org/assets/lion.png");
  return <Image image={image} />;
};

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

const Konva = () => {
  const [stars, setStars] = React.useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e) => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      })
    );
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={1}></Grid>
        <Grid item xs={6}>
          {/* <Dragable /> */}
          <Responsive></Responsive>
          <Stage
          //  width={window.innerWidth}
          //  height={window.innerHeight}
          //  scaleX={scale}
          //  scaleY={scale}
          >
            <Layer>
              <LionImage />

              <Text text="Try to drag a star" />
              {stars.map((star) => (
                <Star
                  key={star.id}
                  id={star.id}
                  x={star.x}
                  y={star.y}
                  numPoints={5}
                  innerRadius={20}
                  outerRadius={40}
                  fill="#89b717"
                  opacity={0.8}
                  draggable
                  rotation={star.rotation}
                  shadowColor="black"
                  shadowBlur={10}
                  shadowOpacity={0.6}
                  shadowOffsetX={star.isDragging ? 10 : 5}
                  shadowOffsetY={star.isDragging ? 10 : 5}
                  scaleX={star.isDragging ? 1.2 : 1}
                  scaleY={star.isDragging ? 1.2 : 1}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              ))}
            </Layer>
          </Stage>
        </Grid>
        <Grid item xs={2}>
          <TextField id="" label="Asik" fullWidth />
          <TextField id="" label="Asik" fullWidth />
        </Grid>
        <Grid item xs={2}>
          <TextField id="" label="Asik" fullWidth />
          <TextField id="" label="Asik" fullWidth />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  );
};

export default Konva;
