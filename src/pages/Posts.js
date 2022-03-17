import React, { useEffect, useState } from "react";
import API from "../services";
import useQuery from "../hooks/useQuery";
import { useHistory } from "react-router-dom";

import PostsList from "../components/posts/PostsList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

const Posts = () => {
  const [posts, setPosts] = useState();
  const history = useHistory();
  const query = useQuery();
  const page = parseInt(query.get("page")) || 1;
  const limit = parseInt(query.get("limit")) || 20;

  const handleChange = (event, value) => {
    history.push(`/posts?page=${value}`);
  };

  useEffect(() => {
    const req = async () => {
      try {
        const res = await API.getPosts({ query: "favorite", limit, page });
        setPosts(res);
      } catch (error) {}
    };

    req();
  }, [page, limit]);

  return (
    <Grid container spacing={0}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        {posts && (
          <Grid item xs={12} justifyContent="center" container>
            <Pagination
              count={posts.totalPages}
              page={page}
              onChange={handleChange}
              sx={{ m: "auto" }}
            />
          </Grid>
        )}
        {posts && <PostsList posts={posts.docs} />}
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default Posts;
