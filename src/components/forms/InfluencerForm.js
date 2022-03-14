import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useDialog from "../../hooks/useDialog";
import { useState } from "react";
import { useSnackbar } from "notistack";
import API from "../../services";

import Input from "../../core/input/Input";
import MySelect from "../../core/input/Select";
import Radio from "../../core/input/Radio";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().lowercase().required("Wajib"),
  gender: Yup.boolean().required("Wajib"),
  hijab: Yup.boolean().required("Wajib"),
});

function InfluencerForm({ influencer }) {
  console.log(influencer);

  const { handleClose, handleCancel, handleConfirm } = useDialog();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { control, handleSubmit, reset, register, watch } = useForm({
    resolver: yupResolver(FORM_VALIDATION),
    defaultValues: {
      username: influencer?.username || "",
      gender: influencer ? (influencer.gender === false ? false : true) : true,
      hijab: influencer?.hijab || false,
    },
  });

  const action = (key) => (
    <IconButton aria-label="" onClick={() => closeSnackbar(key)}>
      <CloseIcon sx={{ color: "white" }} />
    </IconButton>
  );
  const updateInfluencer = async (data) => {
    console.log("UPDATE");
    try {
      setIsFetching(true);
      // console.log(await API.updateInfluencer({ ...data, id: influencer._id }));
      enqueueSnackbar("Update Influencer success", {
        variant: "success",
        autoHideDuration: 3000,
        action,
      });
      handleConfirm();
    } catch (error) {
      if (error.response.status === 500) {
        enqueueSnackbar("Update Influencer Failed", {
          variant: "error",
          autoHideDuration: 3000,
          action,
        });
        handleClose();
      } else {
        setError(error.response.data.message);
      }
    }
    setIsFetching(false);
  };

  const createInfluencer = async (data) => {
    try {
      setIsFetching(true);
      console.log(data);
      console.log(await API.createInfluencer(data));
      enqueueSnackbar("Create Influencer success", {
        variant: "success",
        autoHideDuration: 3000,
        action,
      });
      handleConfirm();
    } catch (error) {
      if (error.response.status === 500) {
        enqueueSnackbar("Create Influencer Failed", {
          variant: "error",
          autoHideDuration: 3000,
          action,
        });
        handleClose();
      } else {
        setError(error.response.data.message);
      }
      console.log(error);
    }
    setIsFetching(false);
  };

  return (
    //     <div>
    <form
      onSubmit={handleSubmit(influencer ? updateInfluencer : createInfluencer)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1,
          pt: 1,
        }}
      >
        {/* <Grid container spacing={2}> */}
        {/* <Grid item xs={12}> */}
        <Input
          name="username"
          label="Username"
          control={control}
          fullWidth
          inputProps={{ style: { textTransform: "lowercase" } }}
        />

        <Radio
          row
          name="gender"
          label="Gender"
          control={control}
          options={[
            { value: true, label: "MALE" },
            { value: false, label: "FEMALE" },
          ]}
        />
        <Radio
          row
          name="hijab"
          label="Hijab"
          control={control}
          options={[
            { value: true, label: "Ya" },
            { value: false, label: "Tidak" },
          ]}
        />

        {/* </Grid> */}
        {/* <Grid item xs={6}> */}

        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}
        <Box sx={{ display: "flex", gap: 2 }}>
          <LoadingButton
            loading={isFetching}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </LoadingButton>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
        {/* </Grid> */}
        {/* </Grid> */}
      </Box>
    </form>
    //     </div>
  );
}

export default InfluencerForm;
