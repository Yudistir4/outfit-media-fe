import { useState, useCallback, useMemo, useRef } from "react";
import MyDialog from "./MyDialog";
import DialogContext from "./DialogContext";

const DEFAULT_OPTIONS = {
  title: "Are you sure?",
  description: "",
  content: null,
  confirmationText: "Ok",
  cancellationText: "Cancel",
  dialogProps: {},
  confirmationButtonProps: {},
  cancellationButtonProps: {},
  titleProps: {},
  contentProps: {},
  allowClose: true,
};
const buildOptions = (defaultOptions, options) => {
  const dialogProps = {
    ...(defaultOptions.dialogProps || DEFAULT_OPTIONS.dialogProps),
    ...(options.dialogProps || {}),
  };
  const confirmationButtonProps = {
    ...(defaultOptions.confirmationButtonProps ||
      DEFAULT_OPTIONS.confirmationButtonProps),
    ...(options.confirmationButtonProps || {}),
  };
  const cancellationButtonProps = {
    ...(defaultOptions.cancellationButtonProps ||
      DEFAULT_OPTIONS.cancellationButtonProps),
    ...(options.cancellationButtonProps || {}),
  };
  const titleProps = {
    ...(defaultOptions.titleProps || DEFAULT_OPTIONS.titleProps),
    ...(options.titleProps || {}),
  };
  const contentProps = {
    ...(defaultOptions.contentProps || DEFAULT_OPTIONS.contentProps),
    ...(options.contentProps || {}),
  };

  return {
    ...DEFAULT_OPTIONS,
    ...defaultOptions,
    ...options,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
    titleProps,
    contentProps,
  };
};

const DialogProvider = ({ children, defaultOptionsCustom = {} }) => {
  const [options, setOptions] = useState({
    ...DEFAULT_OPTIONS,
    ...defaultOptionsCustom,
  });
  const [resolveReject, setResolveReject] = useState([]);
  const [resolve, reject] = resolveReject;
  const confirmation = useRef();
  const cancellation = useRef();

  const createDialog = useCallback((options = {}) => {
    return new Promise((resolve, reject) => {
      // setOptions(options);
      setOptions(buildOptions(defaultOptionsCustom, options));
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
    cancellation.current && cancellation.current(true);

    // if (reject) {
    // reject();
    handleClose();
    // }
  }, [reject, handleClose]);

  const handleConfirm = useCallback(() => {
    confirmation.current && confirmation.current(true);
    handleClose();
  }, [resolve, handleClose]);

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
