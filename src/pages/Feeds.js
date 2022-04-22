import React, { useState, useEffect } from "react";
import { inProgress, createPost } from "../constants/dummy";
import Display from "../components/konva/Display";
import Grid from "@mui/material/Grid";
import useQuery from "../hooks/useQuery";

import Pagination from "@mui/material/Pagination";

import API from "../services";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { useHistory, useParams } from "react-router-dom";

const Feeds = () => {
  const [feeds, setFeeds] = useState();
  const history = useHistory();
  const { status } = useParams();
  const query = useQuery();
  const page = parseInt(query.get("page")) || 1;
  const limit = parseInt(query.get("limit")) || 10;
  const handleChange = (event, value) => {
    history.push("/feeds?page=" + value);
  };

  useEffect(() => {
    const get = async () => {
      const data = await API.getFeeds({ page, status, limit });
      console.log(data);
      setFeeds(data);
    };
    get();
  }, [status]);

  const addFeed = async () => {
    const data = await API.createFeed(createPost);
    console.log(data);
    history.push(`/feeds/${data._id}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Button variant="contained" color="primary" onClick={addFeed}>
          ADD FEED
        </Button>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 ">
          {feeds &&
            feeds.docs.map((item, i) => (
              <div key={i} className="group aspect-square relative">
                <div className="z-10 duration-500 h-full w-full group-hover:bg-black opacity-50 absolute transition-all"></div>

                <div className="z-10 absolute duration-500 transition-all group-hover:flex hidden w-full h-full justify-evenly items-center">
                  {/* <Link to={`feeds/${item._id}`}> */}
                  <Link
                    to={`/feeds/${item._id}`}
                    className="flex items-center justify-center cursor-pointer w-[30%] h-[30%] duration-500 bg-blue-500 hover:bg-blue-600 rounded-full transition-all"
                  >
                    <EditIcon className="text-white" />
                  </Link>
                  {/* </Link> */}

                  <div className="flex items-center justify-center cursor-pointer w-[30%] h-[30%] duration-500 bg-red-500 hover:bg-red-600 rounded-full transition-all">
                    <DeleteIcon className="text-white" />
                  </div>
                </div>
                <Display initPost={item} />
              </div>
            ))}
        </div>
        {feeds && (
          <Grid item xs={12} justifyContent="center" container>
            <Pagination
              count={feeds.totalPages}
              page={page}
              onChange={handleChange}
              sx={{ m: "auto" }}
            />
          </Grid>
        )}
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default Feeds;
