import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef, useCallback } from "react";
import API from "../../services";
// import { useDialog } from "../../hooks/DialogHook";

import LineChart from "./LineChart";
import PostList from "./PostList";
import InfluencerForm from "../forms/InfluencerForm";
import InfluencerListItem from "./InfluencerListItem";

import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

let render = 0;

const InfluencerList = ({
  influencers,
  deleteInfluencersState,
  updateInfluencersState,
}) => {
  return (
    <div>
      {influencers &&
        influencers.docs.map((influencer, index) => {
          return (
            <InfluencerListItem
              key={influencer._id}
              influencer={influencer}
              deleteInfluencersState={deleteInfluencersState}
              updateInfluencersState={updateInfluencersState}
            />
          );
        })}
    </div>
  );
};

export default InfluencerList;
