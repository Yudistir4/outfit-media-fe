import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider from "./store/Auth";
import DialogProvider from "./hooks/DialogProvider";
import { SnackbarProvider } from "notistack";
import ConfirmProvider from "./hooks/ConfirmProvider";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

const action = (key) => (
  <IconButton aria-label="" onClick={onClickDismiss(key)}>
    <CloseIcon sx={{ color: "white" }} />
  </IconButton>
);

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <SnackbarProvider
        ref={notistackRef}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        autoHideDuration={3000}
        action={action}
      >
        <DialogProvider>
          <ConfirmProvider>
            <App />
          </ConfirmProvider>
        </DialogProvider>
      </SnackbarProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
