import React from "react";
import "./postList.css";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

const PostList = ({ posts }) => {
  console.log(posts);

  return (
    <Grid item container xs={6} spacing={1}>
      {posts &&
        posts.map((item, index) => (
          <Grid item xs={4} key={index}>
            <Card sx={{ maxWidth: "100%" }}>
              <a href={`https://www.instagram.com/p/${item.idPostIg}`}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="130"
                    width="100"
                    image={item.postImgDisplayUrlFirebase}
                    alt="green iguana"
                  />
                </CardActionArea>
              </a>
              <CardActions>
                <IconButton aria-label="" size="small">
                  <FavoriteIcon size="small" />
                </IconButton>
                {item.jumlahLike}
                {/* <Chip label="3" size="small" /> */}
                {/* <Button size="small" color="primary">
              Share
            </Button> */}
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default PostList;
