import { useState, useEffect, useMemo, memo } from "react";
import API from "../services";
import { Link, useLocation, useHistory } from "react-router-dom";
import useDialog from "../hooks/useDialog";
import { useSnackbar } from "notistack";
import useConfirm from "../hooks/useConfirm";
import useQuery from "../hooks/useQuery";

import InfluencerForm from "../components/forms/InfluencerForm";
import InfluencerList from "../components/influencer/InfluencerList";

import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";

let render = 1;

const Influencer = () => {
  render++;
  console.log("render :", render);
  const confirm = useConfirm();
  const [influencers, setInfluencers] = useState();
  const { createDialog } = useDialog();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const query = useQuery();
  const page = parseInt(query.get("page")) || 1;
  const limit = parseInt(query.get("limit")) || 10;
  const history = useHistory();
  const handleChange = (event, value) => {
    history.push("/influencers?page=" + value);
  };

  const action = (key) => (
    <IconButton aria-label="" onClick={() => closeSnackbar(key)}>
      <CloseIcon sx={{ color: "white" }} />
    </IconButton>
  );
  const createInfluencer = () => {
    // debugger;
    createDialog({
      title: "Create Influencer",
      // contentText: "Asik",
      contentComponent: <InfluencerForm />,
    })
      .then(async () => {
        console.log("HANDLE OK");
        const res = await API.getInfluencersPosts({ page, limit });
        setInfluencers(res);
      })
      .catch(() => {
        console.log("HANDLE CANCEL");
      });
  };

  useEffect(async () => {
    try {
      console.log("GET");

      const res = await API.getInfluencersPosts({ page, limit });
      setInfluencers(res);
    } catch (error) {}
  }, [page, limit]);

  return (
    <Grid container spacing={0}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Button variant="contained" color="primary" onClick={createInfluencer}>
          ADD INFLUENCER
        </Button>
        {/* <InfluencerForm /> */}
        {influencers && (
          <Grid item xs={12} justifyContent="center" container>
            <Pagination
              count={influencers.totalPages}
              page={page}
              onChange={handleChange}
              sx={{ m: "auto" }}
            />
          </Grid>
        )}
        {influencers && <InfluencerList influencers={influencers} />}
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default Influencer;
