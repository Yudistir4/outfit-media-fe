import React, { useState, useEffect, useRef } from "react";
import "./postList.css";
import API from "../../services";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {  CardActionArea, CardActions } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.favorite || false);
  const handleFavoritePost = async () => {
    setLike((prev) => !prev);
  };
  const initialRender = useRef(true);
  useEffect(() => {
    let timer1;

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      timer1 = setTimeout(async () => {
        console.log(like);
        await API.updatePost({ id: post._id, favorite: like });
      }, 1000);
    }
    return () => {
      clearTimeout(timer1);
    };
  }, [like]);

  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: "100%" }}>
        <a href={`https://www.instagram.com/p/${post.idPostIg}`}>
          <CardActionArea>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                paddingTop: "100%",
                overFlow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                height="100%"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                image={post.postImgDisplayUrlFirebase}
                alt="green iguana"
              />
            </Box>
          </CardActionArea>
        </a>
        <CardActions>
          <IconButton aria-label="" size="small" onClick={handleFavoritePost}>
            <FavoriteIcon size="small" color={like ? "error" : ""} />
          </IconButton>
          {post.jumlahLike}
          {/* <Chip label="3" size="small" /> */}
          {/* <Button size="small" color="primary">
              Share
            </Button> */}
        </CardActions>
      </Card>
    </Grid>
  );
};

const PostList = ({ posts }) => {
  console.log(posts);

  return (
    <Grid item container xs={6} spacing={1}>
      {posts && posts.map((item) => <Post post={item} key={item.idPostIg} />)}
    </Grid>
  );
};

export default PostList;
