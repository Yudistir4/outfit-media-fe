import React, { useEffect, useState } from "react";
import API from "../services";

import PostsList from "../components/posts/PostsList";

import Grid from "@mui/material/Grid";

const Posts = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const req = async () => {
      try {
        const res = await API.getPosts("favorite");
        setPosts(res);
      } catch (error) {}
    };

    req();
  }, []);

  return (
    <Grid container spacing={0}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        {posts && <PostsList posts={posts.docs} />}
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default Posts;
