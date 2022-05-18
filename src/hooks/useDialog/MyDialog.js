import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";

const MyDialog = ({ onClose, onCancel, onConfirm, options, open }) => {
  const {
    title,
    description,
    content,
    contentWithButton,
    confirmationText,
    cancellationText,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
    titleProps,
    contentProps,
    allowClose,
    onClickConfirm,
  } = options;

  const [isFetching, setIsFetching] = useState(false);

  return (
    <Dialog
      open={open}
      fullWidth
      {...dialogProps}
      onClose={
        allowClose
          ? () => {
              if (isFetching) return;
              onClose();
            }
          : null
      }
    >
      <DialogTitle {...titleProps}>{title}</DialogTitle>

      <DialogContent {...contentProps}>
        {content && content}
        {contentWithButton && contentWithButton}
        {!contentWithButton && !content && (
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        )}
      </DialogContent>

      {!contentWithButton && (
        <DialogActions>
          <Button
            onClick={async () => {
              if (onClickConfirm) {
                setIsFetching(true);
                try {
                  await onClickConfirm();
                  setIsFetching(false);
                  return onConfirm(true);
                } catch (error) {
                  setIsFetching(false);
                  return onConfirm(false);
                }
              }
              onConfirm();
            }}
            variant="contained"
            disabled={isFetching}
            {...confirmationButtonProps}
          >
            {confirmationText}
          </Button>
          {/* <Button onClick={onConfirm} {...confirmationButtonProps}>
            {confirmationText}
          </Button> */}
          <Button
            variant="contained"
            onClick={onCancel}
            disabled={isFetching}
            {...cancellationButtonProps}
          >
            {cancellationText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default MyDialog;
