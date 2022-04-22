import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Dialog from "@mui/material/Dialog";

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
    // allowClose,
  } = options;

  return (
    <Dialog onClose={onClose} open={open} fullWidth {...dialogProps}>
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
          <Button onClick={onConfirm} {...confirmationButtonProps}>
            {confirmationText}
          </Button>
          <Button onClick={onCancel} autoFocus {...cancellationButtonProps}>
            {cancellationText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default MyDialog;
