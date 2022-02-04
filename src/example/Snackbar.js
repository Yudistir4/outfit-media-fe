import React from "react";
import Button from "@mui/material/Button";
import { SnackbarProvider, useSnackbar } from "notistack";

function MyApp() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("I love snacks.");
  };

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(`This is a ${variant} message!`, { variant });
  };

  const handleClickCustom = (message) => {
    const action = (key) => (
      <>
        <Button onClick={() => alert(`I belong to snackbar with key ${key}`)}>
          'Alert'
        </Button>
        <Button onClick={() => closeSnackbar(key)}>'Dismiss'</Button>
      </>
    );

    enqueueSnackbar("Hola", {
      variant: "warning",
      autoHideDuration: 3000,
      action,
    });
  };

  return (
    <React.Fragment>
      <Button onClick={handleClick}>Show snackbar</Button>
      <Button onClick={handleClickVariant("success")}>
        Show success snackbar
      </Button>
      <Button onClick={handleClickVariant("error")}>Show error snackbar</Button>
      <Button variant="contained" color="primary" onClick={handleClickCustom}>
        Custom Snackbar
      </Button>
    </React.Fragment>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider
      action={
        <Button color="error" onClick={() => alert("asik")}>
          Alert
        </Button>
      }
      maxSnack={3}
    >
      <MyApp />
    </SnackbarProvider>
  );
}
