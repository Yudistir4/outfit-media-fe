import { Link } from "react-router-dom";
import { useState, useEffect, useRef, memo, useCallback } from "react";
import API from "../../services";
import useDialog from "../../hooks/useDialog";

import LineChart from "./LineChart";
import PostList from "./PostList";
import InfluencerForm from "../forms/InfluencerForm";

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
const InfluencerListItem = ({ influencer }) => {
  render++;
  console.log("Render Influencer Item :", render);

  const [like, setLike] = useState(influencer.favorite);
  const { createDialog } = useDialog();
  const handleFavoriteInfluencer = async (id) => {
    setLike((prev) => !prev);
  };

  const editInfluencer = useCallback(() => {
    createDialog({
      title: "Edit Influencer",
      contentComponent: <InfluencerForm influencer={influencer} />,
    })
      .then(() => {
        console.log("HANDLE OK");
      })
      .catch(() => {
        console.log("HANDLE CANCEL");
      });
  }, []);

  const initialRender = useRef(true);
  useEffect(() => {
    let timer1;

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      timer1 = setTimeout(async () => {
        console.log(like);
        await API.updateInfluencer({
          id: influencer._id,
          favorite: like,
        });
      }, 1000);
    }

    // this will clear Timeout
    // when component unmount like in willComponentUnmount
    // and show will not change to true
    return () => {
      clearTimeout(timer1);
    };
  }, [like]);

  return (
    <Paper elevation={4} sx={{ p: 2, my: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to={`/users/`}>
            <Avatar
              sx={{ mr: 1, width: 50, height: 50 }}
              src={influencer?.profilePicUrlFirebase}
            />
          </Link>
          <Box sx={{ minWidth: 200 }}>
            <Typography variant="h6" color="initial">
              {influencer.username}
            </Typography>
            <Typography variant="body2" color="initial">
              asik
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton aria-label="" color="error">
            <DeleteIcon color="error" />
          </IconButton>
          <IconButton aria-label="" color="primary" onClick={editInfluencer}>
            <EditIcon color="primary" />
          </IconButton>

          <IconButton aria-label="" onClick={handleFavoriteInfluencer}>
            <FavoriteIcon color={like ? "error" : ""} />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={0} mt={2}>
        <Grid item xs={6}>
          <LineChart
            data={influencer.posts
              .map((post, indexPost) => {
                return {
                  name: indexPost + 1,
                  uv: post.jumlahLike,
                  link: `https://www.instagram.com/p/${post.idPostIg}`,
                };
              })
              .reverse()}
          />
        </Grid>
        <PostList
          posts={[...influencer.posts]
            .sort((a, b) => b.jumlahLike - a.jumlahLike)
            .slice(0, 3)
            .reverse()}
        />
      </Grid>
    </Paper>
  );
};

export default InfluencerListItem;
