import { useState, useEffect, useMemo } from "react";
import API from "../services";
import { Link, useLocation, useHistory } from "react-router-dom";

import InfluencerList from "../components/influencer/InfluencerList";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Influencer = () => {
  const [influencers, setInfluencers] = useState();

  const query = useQuery();
  const page = parseInt(query.get("page")) || 1;
  const limit = parseInt(query.get("limit")) || 10;
  const history = useHistory();
  const handleChange = (event, value) => {
    history.push("/influencers?page=" + value);
  };

  useEffect(async () => {
    try {
      const res = await API.getInfluencersPosts({ page, limit });
      setInfluencers(res);
    } catch (error) {}
  }, [page, limit]);

  return (
    <Grid container spacing={0}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
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
