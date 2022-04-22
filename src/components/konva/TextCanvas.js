import React, { useRef, useEffect } from "react";
import { Transformer, Text } from "react-konva";
import { useWatch } from "react-hook-form";

const TextCanvas = ({
  shapeProps,
  isSelected,
  onSelect,
  onChangeCanvas,
  setValue,
  name,
  control,
  convertToPercentageSize,
}) => {
  const shapeRef = useRef();
  const trRef = useRef();
  if (control) {
    shapeProps.text = useWatch({ control, name: `${name}.text` });
  }

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
    //     field: { onChange, value, ref },
    //     fieldState: { error },
    //     formState,
    //   }) => (
    <>
      {/* {shapeProps.text !== "" && ( */}
      <Text
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        align="center"
        //    draggable={}
        onDragEnd={(e) => {
          let newAttrs = {
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          };
          onChangeCanvas(newAttrs);
          newAttrs = convertToPercentageSize(newAttrs);

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
          newAttrs = convertToPercentageSize(newAttrs);

          setValue(`${name}.x`, newAttrs.x);
          setValue(`${name}.y`, newAttrs.y);
          setValue(`${name}.width`, newAttrs.width);
          setValue(`${name}.height`, newAttrs.height);
          // onChange(convertToPercentageSize(newAttrs));
        }}
      />
      {/* )} */}
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

export default TextCanvas;
