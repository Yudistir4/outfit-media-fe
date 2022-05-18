import React, { useState } from "react";
import { useAuth } from "../store/Auth";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink, Link } from "react-router-dom";
import { Avatar, IconButton, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
// import "./Appbar.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function PrimarySearchAppBar() {
  const { user, dispatch } = useAuth();

  const logoutHandle = () => dispatch({ type: "LOGOUT" });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    console.log("leave");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Toolbar>
          <Grid container spacing={0}>
            <Grid item xs={0} sm={0} md={0} lg={1}>
              {" "}
            </Grid>

            <Grid
              item
              xs={2}
              sm={0}
              md={3}
              lg={3}
              display={{ xs: "none", sm: "none", md: "block" }}
            >
              <IconButton color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit">
                <InstagramIcon />
              </IconButton>
            </Grid>

            <Grid
              item
              xs={12}
              sm={8}
              md={6}
              lg={4}
              container
              justifyContent={{ xs: "center", sm: "flex-start", md: "center" }}
              alignItems="center"
            >
              <NavLink
                to="/influencers"
                className="navLink"
                activeclassname="active"
                exact
              >
                INFLUENCER
              </NavLink>

              <NavLink
                to={`/posts/`}
                className="navLink"
                activeclassname="active"
              >
                FAVORITE POST
              </NavLink>
              <div
                id="basic-button"
                className="navLink cursor-pointer "
                // aria-controls={open ? "basic-menu" : undefined}
                // aria-haspopup="true"
                // aria-expanded={open ? "true" : undefined}
                onMouseEnter={handleClick}
              >
                FEEDS
              </div>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Link to="/feeds-status/inProgress">
                  <MenuItem onClick={handleClose}>In Progress</MenuItem>
                </Link>
                <Link to="/feeds-status/inReview">
                  <MenuItem onClick={handleClose}>In Review</MenuItem>
                </Link>
                <Link to="/feeds-status/inPost">
                  <MenuItem onClick={handleClose}>In Post</MenuItem>
                </Link>
                <Link to="/feeds-status/done">
                  <MenuItem onClick={handleClose}>Done</MenuItem>
                </Link>
              </Menu>
              <NavLink
                to={`/logos/`}
                className="navLink"
                activeclassname="active"
              >
                LOGO
              </NavLink>

              {user && (
                <div
                  className="navLink"
                  // activeclassname="active"
                  onClick={logoutHandle}
                >
                  LOGOUT
                </div>
              )}
            </Grid>

            <Grid
              item
              xs={0}
              sm={4}
              md={3}
              lg={3}
              display={{ xs: "none", sm: "flex", md: "flex" }}
              // sx={{ display: "flex" }}
              container
              justifyContent="flex-end"
              alignItems="center"
            >
              {!user && (
                <>
                  <NavLink
                    to="/login"
                    className="navLink"
                    activeclassname="active"
                  >
                    LOGIN
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="navLink"
                    activeclassname="active"
                  >
                    SIGN UP
                  </NavLink>
                </>
              )}
              {user && (
                <NavLink
                  to="/setting"
                  className="navLink"
                  activeClassName="active"
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ mr: 2 }}>
                      {user.username}
                    </Typography>
                    <Avatar src={user.profilePic} />
                  </Box>
                </NavLink>
              )}
            </Grid>

            <Grid item xs={0} sm={0} md={0} lg={1}></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
