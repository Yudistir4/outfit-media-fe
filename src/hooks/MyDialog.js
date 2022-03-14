import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Dialog from "@mui/material/Dialog";

const MyDialog = ({ onClose, onCancel, onConfirm, options, open }) => {
  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <DialogTitle>{options.title ? options.title : "Title"}</DialogTitle>

      <DialogContent>
        {options.contentComponent && options.contentComponent}
        {!options.contentComponent && (
          <DialogContentText id="alert-dialog-description">
            {options.contentText ? options.contentText : "Content..."}
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
