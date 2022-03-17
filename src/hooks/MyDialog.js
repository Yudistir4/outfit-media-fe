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
    confirmationText,
    cancellationText,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
    titleProps,
    contentProps,
    allowClose,
  } = options;

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <DialogTitle>{title ? title : "Title"}</DialogTitle>

      <DialogContent>
        {options.contentComponent && options.contentComponent}
        {!options.contentComponent && (
          <DialogContentText id="alert-dialog-description">
            {description ? description : "Content..."}
          </DialogContentText>
        )}
      </DialogContent>
      {!options.contentComponent && (
        <DialogActions>
          <Button onClick={onConfirm}>Delete</Button>
          <Button onClick={onClose} autoFocus>
            Batalkan
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default MyDialog;
