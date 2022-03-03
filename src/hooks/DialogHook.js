import { useState, createContext, useContext, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Dialog from "@mui/material/Dialog";

const DialogCtx = createContext();

export const useDialog = () => {
  return useContext(DialogCtx);
};

const MyDialog = ({ handleClose, open, title, content, handleOk }) => {
  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>{title ? title : "Title"}</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content ? content : "Content..."}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleOk}>Delete</Button>
        <Button onClick={handleClose} autoFocus>
          Batalkan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const confirmation = useRef();
  const cancellation = useRef();

  // const [actionOk, setActionOk] = useState();
  // const [dialogStatus, setDialogStatus] = useState();
  useEffect(() => {
    console.log(confirmation.current);
  }, [confirmation]);

  const handleOk = () => {
    confirmation.current && confirmation.current(true);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);

    cancellation.current && cancellation.current(false);
  };

  const createDialog = (title, content) => {
    setTitle(title);
    setContent(content);
    // setActionOk(actionOk);
    handleOpen();
    return new Promise(function (myResolve, myReject) {
      confirmation.current = myResolve;
      cancellation.current = myReject;
    });
  };
  const props = { handleOpen, handleClose, open, title, content, handleOk };

  return (
    <DialogCtx.Provider value={createDialog}>
      <MyDialog {...props} />
      {children}
    </DialogCtx.Provider>
  );
};

export default DialogProvider;
// export const MyDialog = ({ handleClose, open, title, content, handleOk }) => {
//   return (
//     <Dialog onClose={handleClose} open={open}>
//       <DialogTitle>{title ? title : "Title"}</DialogTitle>

//       <DialogContent>
//         <DialogContentText id="alert-dialog-description">
//           {content ? content : "Content..."}
//         </DialogContentText>
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={handleOk}>Delete</Button>
//         <Button onClick={handleClose} autoFocus>
//           Batalkan
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// const useDialog = () => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return { handleOpen, handleClose, open };
// };

// export default useDialog;
