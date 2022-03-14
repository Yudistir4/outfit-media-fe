import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import API from "../../services";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.favorite || false);
  const handleFavoritePost = async (id) => {
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
      <Card sx={{ maxWidth: "auto" }}>
        <a href={`https://www.instagram.com/p/${post.idPostIg}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="50%"
              sx={{ objectFit: "cover" }}
              image={post.postImgDisplayUrlFirebase}
              alt="green iguana"
            />
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

const PostsList = ({ posts }) => {
  console.log(posts);

  return (
    <Grid item container xs={12} spacing={1}>
      {posts && posts.map((item) => <Post post={item} key={item.idPostIg} />)}
    </Grid>
  );
};

export default PostsList;
