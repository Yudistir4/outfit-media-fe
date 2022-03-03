import React, { useState, useEffect, forwardRef } from "react";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Controller } from "react-hook-form";
import "./TextEditor.css";
// import ReactDOM from "react-dom";
// import { Editor, EditorState } from "draft-js";
// import "draft-js/dist/Draft.css";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Typography from "@mui/material/Typography";

// import { convertToHTML } from "draft-convert";
// import DOMPurify from "dompurify";

let render = 0;

const EditorCustom = forwardRef(({ onChange, value, error }, ref) => {
  // console.log(error && error.message);
  console.log("TextEditor :", render);
  render++;
  let read;
  if (!onChange) {
    read = { toolbarHidden: true, readOnly: true };
  }
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const defaultValue = value ? value : "";
    const blocksFromHtml = htmlToDraft(defaultValue);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHtml.contentBlocks,
      blocksFromHtml.entityMap
    );
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [onChange, editorState]);

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  return (
    <>
      <Editor
        {...read}
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        placeholder="Text here..."
        editorRef={ref && ref}
      />
      <Typography variant="body2" color="error">
        {error && error.message}
      </Typography>

      {/* <div className="preview" dangerouslySetInnerHTML={convertedContent}></div> */}
    </>
  );
});

const TextEditor = ({ name, control, readOnly, value }) => {
  if (readOnly) {
    return <EditorCustom value={value} />;
  }
  return (
    <Controller
      name={name}
      control={control}
      // rules={{
      //   validate: {
      //     required: (v) =>
      //       (v && stripHtml(v).result.length > 0) ||
      //       "Description is required",
      //     maxLength: (v) =>
      //       (v && stripHtml(v).result.length <= 2000) ||
      //       "Maximum character limit is 2000",
      //   },
      // }}
      render={({
        field: { onChange, value, ref },
        fieldState: { error },
        formState,
      }) => (
        <EditorCustom
          onChange={onChange}
          value={value}
          ref={ref}
          error={error}
        />
      )}
    />
  );
};
export default TextEditor;
