import React, { useRef, useEffect } from "react";
import { Transformer, Image, Group } from "react-konva";
import useImage from "use-image";
import { useWatch } from "react-hook-form";

// import { Controller } from "react-hook-form";

const ImageCanvas = ({
  shapeProps,
  isSelected,
  onSelect,
  onChangeCanvas,
  img,
  setValue,
  name,
  convertToPercentageSize,
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

  let props = { width: shapeProps.width, height: shapeProps.height };
  let { width, height, radius } = { ...shapeProps };
  let cornerRadius = [1000, 1000, 1000, 1000];

  return (
    <>
      {!radius && shapeProps.link && (
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
      )}

      {radius && shapeProps.link && (
        <Group
          {...shapeProps}
          onClick={shapeProps.transform !== false && onSelect}
          onTap={shapeProps.transform !== false && onSelect}
          ref={shapeRef}
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
          clipFunc={(ctx) => {
            ctx.beginPath();
            let topLeft = 0;
            let topRight = 0;
            let bottomLeft = 0;
            let bottomRight = 0;
            if (typeof cornerRadius === "number") {
              topLeft =
                topRight =
                bottomLeft =
                bottomRight =
                  Math.min(cornerRadius, width / 2, height / 2);
            } else {
              topLeft = Math.min(cornerRadius[0] || 0, width / 2, height / 2);
              topRight = Math.min(cornerRadius[1] || 0, width / 2, height / 2);
              bottomRight = Math.min(
                cornerRadius[2] || 0,
                width / 2,
                height / 2
              );
              bottomLeft = Math.min(
                cornerRadius[3] || 0,
                width / 2,
                height / 2
              );
            }
            ctx.moveTo(topLeft, 0);
            ctx.lineTo(width - topRight, 0);
            ctx.arc(
              width - topRight,
              topRight,
              topRight,
              (Math.PI * 3) / 2,
              0,
              false
            );
            ctx.lineTo(width, height - bottomRight);
            ctx.arc(
              width - bottomRight,
              height - bottomRight,
              bottomRight,
              0,
              Math.PI / 2,
              false
            );
            ctx.lineTo(bottomLeft, height);
            ctx.arc(
              bottomLeft,
              height - bottomLeft,
              bottomLeft,
              Math.PI / 2,
              Math.PI,
              false
            );
            ctx.lineTo(0, topLeft);
            ctx.arc(
              topLeft,
              topLeft,
              topLeft,
              Math.PI,
              (Math.PI * 3) / 2,
              false
            );
            ctx.closePath();
          }}
        >
          <Image image={image} {...props} />
        </Group>
      )}

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

export default ImageCanvas;
