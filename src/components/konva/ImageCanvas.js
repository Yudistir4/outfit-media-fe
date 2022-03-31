import React, { useRef, useEffect } from "react";
import { Transformer, Image } from "react-konva";
import useImage from "use-image";
// import { useWatch } from "react-hook-form";

// import { Controller } from "react-hook-form";

const ImageCanvas = ({
  shapeProps,
  isSelected,
  onSelect,
  onChangeCanvas,
  img,
  // control,
  setValue,
  name,
  convertToPercentageSize,
  // currentWidth,
  // cellSize,
}) => {
  const [image] = useImage(img, "Anonymous");
  const shapeRef = useRef();
  const trRef = useRef();
  // let hasil = useWatch({ control, name: `products[0].price.text` });
  // shapeProps.link = useWatch({ control, name: `${name}.link` });
  // console.log(hasil);

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    // <Controller
    //   name={name}
    //   control={control}
    //   render={({
    //     field: {
    //       onChange,
    //       // , value, ref
    //     },
    //     // fieldState: { error },
    //     // formState,
    //   }) => (
    <>
      <Image
        image={image}
        onClick={shapeProps.transform !== false && onSelect}
        onTap={shapeProps.transform !== false && onSelect}
        ref={shapeRef}
        {...shapeProps}
        //    draggable={}
        onDragEnd={(e) => {
          let newAttrs = {
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          };
          onChangeCanvas(newAttrs);
          newAttrs = convertToPercentageSize(newAttrs);
          console.log(name);
          setValue(`${name}.x`, newAttrs.x);
          setValue(`${name}.y`, newAttrs.y);
          setValue(`${name}.width`, newAttrs.width);
          setValue(`${name}.height`, newAttrs.height);
          // onChange(convertToPercentageSize(newAttrs));
        }}
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
          let newAttrs = {
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          };
          onChangeCanvas(newAttrs);
          // onChange(convertToPercentageSize(newAttrs));
          newAttrs = convertToPercentageSize(newAttrs);

          setValue(`${name}.x`, newAttrs.x);
          setValue(`${name}.y`, newAttrs.y);
          setValue(`${name}.width`, newAttrs.width);
          setValue(`${name}.height`, newAttrs.height);
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
    //   )}
    // />
  );
};

export default ImageCanvas;
