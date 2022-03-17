import React, { useState, useEffect } from "react";
import API from "../services";
import { useHistory } from "react-router-dom";
import useDialog from "../hooks/useDialog";
import useQuery from "../hooks/useQuery";

import InfluencerForm from "../components/forms/InfluencerForm";
import InfluencerList from "../components/influencer/InfluencerList";

import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";

let render = 1;

const Influencer = () => {
  render++;
  console.log("render :", render);
  const [influencers, setInfluencers] = useState();
  const { createDialog } = useDialog();

  const query = useQuery();
  const page = parseInt(query.get("page")) || 1;
  const limit = parseInt(query.get("limit")) || 10;
  const history = useHistory();
  const handleChange = (event, value) => {
    history.push("/influencers?page=" + value);
  };

  const createInfluencer = () => {
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
      console.log("res :", res);

      setInfluencers(res);
    } catch (error) {}
  }, [page, limit]);

  const deleteInfluencersState = (id) => {
    setInfluencers((prev) => {
      return {
        ...prev,
        docs: prev.docs.filter((item) => item.id !== id),
      };
    });
  };

  const updateInfluencersState = async (newData) => {
    setInfluencers((prev) => {
      return {
        ...prev,
        docs: prev.docs.map((item) => {
          // debugger;
          if (item.id === newData.id) {
            console.log("Masuk");
            return { ...item, ...newData };
          } else {
            return item;
          }
        }),
      };
    });
  };

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
        {influencers && (
          <InfluencerList
            influencers={influencers}
            deleteInfluencersState={deleteInfluencersState}
            updateInfluencersState={updateInfluencersState}
          />
        )}
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default Influencer;
