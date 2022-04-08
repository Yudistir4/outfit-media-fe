import React, { useState } from "react";
import { inProgress } from "../constants/dummy";
import Display from "../components/konva/Display";
import Grid from "@mui/material/Grid";

import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

const InProgress = () => {
  const [posts, setPosts] = useState(inProgress);

  return (
    <Grid container spacing={2}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Link to="/post-editor">
          <Button variant="contained" color="primary">
            ADD POST
          </Button>
        </Link>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 ">
          {posts.map((item, i) => (
            <div key={i} className="group aspect-square relative">
              <div className="z-10 duration-500 h-full w-full group-hover:bg-black opacity-50 absolute transition-all"></div>

              <div className="z-10 absolute duration-500 transition-all group-hover:flex hidden w-full h-full justify-evenly items-center">
                <div className="flex items-center justify-center cursor-pointer w-[30%] h-[30%] duration-500 bg-blue-500 hover:bg-blue-600 rounded-full transition-all">
                  <EditIcon className="text-white" />
                </div>

                <div className="flex items-center justify-center cursor-pointer w-[30%] h-[30%] duration-500 bg-red-500 hover:bg-red-600 rounded-full transition-all">
                  <DeleteIcon className="text-white" />
                </div>
              </div>
              <Display initPost={item} />
            </div>
          ))}
        </div>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default InProgress;
