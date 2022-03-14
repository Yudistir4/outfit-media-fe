import { useState, useCallback, useMemo, useRef } from "react";
import MyDialog from "./MyDialog";
import DialogContext from "./DialogContext";

const DialogProvider = ({ children }) => {
  const [options, setOptions] = useState({});
  const [resolveReject, setResolveReject] = useState([]);
  const [resolve, reject] = resolveReject;
  const confirmation = useRef();
  const cancellation = useRef();

  const createDialog = useCallback((options = {}) => {
    return new Promise((resolve, reject) => {
      setOptions(options);
      setResolveReject([resolve, reject]);
      confirmation.current = resolve;
      cancellation.current = reject;
    });
  }, []);

  const handleClose = useCallback(() => {
    setResolveReject([]);
  }, []);
  const handleCancel = useCallback(() => {
    console.log("CANCEL");
    cancellation.current && cancellation.current(false);

    // if (reject) {
    // reject();
    handleClose();
    // }
  }, [reject, handleClose]);

  const handleConfirm = useCallback(() => {
    confirmation.current && confirmation.current(true);
    handleClose();
    // if (resolve) {
    //   resolve();
    //   handleClose();
    // }
  }, [resolve, handleClose]);
  // const props = useMemo(() => {
  //   return { createDialog, handleClose, handleCancel, handleConfirm };
  // }, [createDialog, handleClose, handleCancel, handleConfirm]);
  const [asu, setProps] = useState({
    createDialog,
    handleClose,
    handleCancel,
    handleConfirm,
  });

  const props = asu;

  return (
    <>
      <DialogContext.Provider value={props}>
        {children}
        <MyDialog
          open={resolveReject.length === 2}
          options={options}
          onClose={handleClose}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      </DialogContext.Provider>
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
