import React, { useState, useEffect } from "react";
import { createPost } from "../constants/dummy";
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
import { useSnackbar } from "notistack";
import useDialog from "../hooks/useDialog";

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
  const { createDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();

  const getFeeds = async () => {
    const data = await API.getFeeds({ page, status, limit });
    console.log(data);
    setFeeds(data);
  };
  useEffect(() => {
    getFeeds();
  }, [status]);

  const addFeed = async () => {
    const data = await API.createFeed(createPost);
    console.log(data);
    history.push(`/feeds/${data._id}`);
  };

  const deleteFeed = async (id) => {
    try {
      createDialog({ title: "Delete Feed", description: "Yakin delete feed?" })
        .then(async () => {
          try {
            console.log("confirm");
            await API.deleteFeed(id);
            await getFeeds();
            enqueueSnackbar("Delete Feed Success", { variant: "success" });
          } catch (error) {
            enqueueSnackbar("Delete Feed Gagal", { variant: "error" });
          }
        })
        .catch(() => {
          console.log("cancelation");
        });
    } catch (error) {
      console.log(error);
    }
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

                  <div
                    onClick={() => deleteFeed(item._id)}
                    className="flex items-center justify-center cursor-pointer w-[30%] h-[30%] duration-500 bg-red-500 hover:bg-red-600 rounded-full transition-all"
                  >
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
