import {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
  memo,
} from "react";
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

const MyDialog = ({
  handleClose,
  open,
  title,
  contentText,
  contentComponent,
  handleOk,
}) => {
  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>{title ? title : "Title"}</DialogTitle>

      <DialogContent>
        {contentComponent && contentComponent}
        {!contentComponent && (
          <DialogContentText id="alert-dialog-description">
            {contentText ? contentText : "Content..."}
          </DialogContentText>
        )}
      </DialogContent>
      {!contentComponent && (
        <DialogActions>
          <Button onClick={handleOk}>Delete</Button>
          <Button onClick={handleClose} autoFocus>
            Batalkan
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState();
  const [contentText, setContentText] = useState();
  const [contentComponent, setContentComponent] = useState();
  const confirmation = useRef();
  const cancellation = useRef();

  // useEffect(() => {
  //   console.log(confirmation.current);
  // }, [confirmation]);

  const handleOk = useCallback(() => {
    confirmation.current && confirmation.current(true);
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);

    cancellation.current && cancellation.current(false);
  }, []);

  const createDialog = useCallback((data) => {
    if (data.title) setTitle(data.title);
    if (data.contentText) setContentText(data.contentText);
    if (data.contentComponent) setContentComponent(data.contentComponent);
    // setActionOk(actionOk);
    handleOpen();
    return new Promise(function (myResolve, myReject) {
      confirmation.current = myResolve;
      cancellation.current = myReject;
    });
  }, []);

  const props = {
    handleOpen,
    handleClose,
    open,
    title,
    contentText,
    contentComponent,
    handleOk,
  };

  return (
    <>
      <DialogCtx.Provider value={{ createDialog, ...props }}>
        {children}
      </DialogCtx.Provider>
      <MyDialog {...props} />
    </>
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
