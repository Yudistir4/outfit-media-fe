import React, { useState, useEffect } from "react";
import { useAuth } from "../store/Auth";

import { NavLink } from "react-router-dom";
import { RiImageEditFill } from "react-icons/ri";
import { IoEyeSharp } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import API from "../services";

export default function PrimarySearchAppBar() {
  const { search } = useLocation();
  console.log("loca ", search);
  // console.log(pathname);
  // console.log(href);
  const { user, dispatch } = useAuth();
  const [popup, setPopup] = useState(false);
  const [notif, setNotif] = useState();

  const getFeedsNotif = async () => {
    try {
      const res = await API.getContentsNotif();
      setNotif(res);
    } catch (error) {
      console.log(error);
    }
  };
  const logoutHandle = () => dispatch({ type: "LOGOUT" });
  useEffect(() => {
    getFeedsNotif();
  }, [search]);

  return (
    <div className="sticky mb-4 z-30 top-0 bg-white w-full h-[60px] shadow-lg shadow-gray-300 flex items-center  px-4 gap-4">
      <h1 className="text-xl font-bold hidden sm:block">OUTFIT MEDIA</h1>
      <div className="flex-1 hidden sm:block"></div>
      <div className="flex gap-2 rounded-xl bg-gray-200 shadow-lg shadow-gray-200 p-1">
        <NavLink
          to="/contents?status=inProgress&sort=+deadline"
          // activeClassName="text-white bg-blue-500 shadow-lg shadow-blue-400"
          className={`${
            search.includes("inProgress")
              ? "text-white bg-blue-500 shadow-lg shadow-blue-400"
              : "text-black"
          } relative rounded-xl  hover:text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-400 font-bold transition-all cursor-pointer duration-200 h-8 w-8 flex items-center justify-center`}
        >
          <RiImageEditFill />
          {notif && notif.inProgress > 0 && (
            <div className="absolute rounded-full bg-red-500 w-4 h-4 text-white   top-[-1px] right-[-2px] flex justify-center items-center text-[10px]">
              {notif.inProgress}
            </div>
          )}
        </NavLink>
        <NavLink
          to="/contents?status=inReview"
          // activeClassName=" text-white bg-blue-500 shadow-lg shadow-blue-400"
          className={`${
            search.includes("inReview")
              ? "text-white bg-blue-500 shadow-lg shadow-blue-400"
              : "text-black"
          } relative rounded-xl  hover:text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-400 font-bold transition-all cursor-pointer duration-200 h-8 w-8 flex items-center justify-center`}
        >
          <IoEyeSharp />
          {notif && notif.inReview > 0 && (
            <div className="absolute rounded-full bg-red-500 w-4 h-4 text-white   top-[-1px] right-[-2px] flex justify-center items-center text-[10px]">
              {notif.inReview}
            </div>
          )}
        </NavLink>
        <NavLink
          to="/contents?status=inPost&sort=+schedule"
          // activeClassName="text-white bg-blue-500 shadow-lg shadow-blue-400"
          className={`${
            search.includes("inPost")
              ? "text-white bg-blue-500 shadow-lg shadow-blue-400"
              : "text-black"
          } relative rounded-xl  hover:text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-400 font-bold transition-all cursor-pointer duration-200 h-8 w-8 flex items-center justify-center`}
        >
          <RiSendPlaneFill />
          {notif && notif.inPost > 0 && (
            <div className="absolute rounded-full bg-red-500 w-4 h-4 text-white   top-[-1px] right-[-2px] flex justify-center items-center text-[10px]">
              {notif.inPost}
            </div>
          )}
        </NavLink>
        <NavLink
          to="/contents?status=done"
          // activeClassName="text-white bg-blue-500 shadow-lg shadow-blue-400"
          // className="rounded-xl  hover:text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-400 font-bold transition-all cursor-pointer duration-200 h-8 w-8 flex items-center justify-center"
          className={`${
            search.includes("done")
              ? "text-white bg-blue-500 shadow-lg shadow-blue-400"
              : "text-black"
          }  relative rounded-xl  hover:text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-400 font-bold transition-all cursor-pointer duration-200 h-8 w-8 flex items-center justify-center`}
        >
          <FaCheck />
        </NavLink>
      </div>
      <div className="flex-1 sm:hidden"></div>

      <NavLink
        to="/logos"
        activeClassName="text-white bg-blue-500 shadow-lg shadow-blue-400"
        className="flex-shrink-0 rounded-xl hover:text-white hover:bg-blue-500 font-bold hover:shadow-lg hover:shadow-blue-400 transition-all cursor-pointer duration-200 h-10 w-10 flex items-center justify-center"
      >
        <AiFillInstagram />
      </NavLink>

      <div
        onClick={() => setPopup((prev) => !prev)}
        className="relative flex-shrink-0"
      >
        {user.profilePic.url ? (
          <img
            className="rounded-full h-12 w-12 object-cover cursor-pointer"
            src={user.profilePic.url ? user.profilePic.url : ""}
            alt=""
          />
        ) : (
          <div className="cursor-pointer rounded-full h-12 w-12 bg-gray-900 flex justify-center items-center text-white font-bold text-xl">
            {user.username[0].toUpperCase()}
          </div>
        )}
        {popup && (
          <div className="z-30 rounded-xl overflow-hidden absolute shadow-lg shadow-gray-400 bg-white sm:left-1/2 sm:-translate-x-1/2 right-0 sm:right-auto top-16">
            <NavLink
              to="/setting"
              className="py-2 px-4 transition-all hover:bg-gray-100 cursor-pointer"
            >
              Setting
            </NavLink>
            <div
              onClick={logoutHandle}
              className="py-2 px-4 transition-all hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="sticky" color="inherit" elevation={0}>
    //     <Toolbar>
    //       <Grid container spacing={0}>
    //         <Grid item xs={0} sm={0} md={0} lg={1}>
    //           {" "}
    //         </Grid>

    //         <Grid
    //           item
    //           xs={2}
    //           sm={0}
    //           md={3}
    //           lg={3}
    //           display={{ xs: "none", sm: "none", md: "block" }}
    //         >
    //           <IconButton color="inherit">
    //             <FacebookIcon />
    //           </IconButton>
    //           <IconButton color="inherit">
    //             <TwitterIcon />
    //           </IconButton>
    //           <IconButton color="inherit">
    //             <InstagramIcon />
    //           </IconButton>
    //         </Grid>

    //         <Grid
    //           item
    //           xs={12}
    //           sm={8}
    //           md={6}
    //           lg={4}
    //           container
    //           justifyContent={{ xs: "center", sm: "flex-start", md: "center" }}
    //           alignItems="center"
    //         >
    //           <NavLink
    //             to="/influencers"
    //             className="navLink"
    //             activeclassname="active"
    //             exact
    //           >
    //             INFLUENCER
    //           </NavLink>

    //           <NavLink
    //             to={`/posts/`}
    //             className="navLink"
    //             activeclassname="active"
    //           >
    //             FAVORITE POST
    //           </NavLink>
    //           <div
    //             id="basic-button"
    //             className="navLink cursor-pointer "
    //             // aria-controls={open ? "basic-menu" : undefined}
    //             // aria-haspopup="true"
    //             // aria-expanded={open ? "true" : undefined}
    //             onMouseEnter={handleClick}
    //           >
    //             FEEDS
    //           </div>
    //           <Menu
    //             id="basic-menu"
    //             anchorEl={anchorEl}
    //             open={open}
    //             onClose={handleClose}
    //             MenuListProps={{
    //               "aria-labelledby": "basic-button",
    //             }}
    //           >
    //             <Link to="/contents/inProgress">
    //               <MenuItem onClick={handleClose}>In Progress</MenuItem>
    //             </Link>
    //             <Link to="/contents/inReview">
    //               <MenuItem onClick={handleClose}>In Review</MenuItem>
    //             </Link>
    //             <Link to="/contents/inPost">
    //               <MenuItem onClick={handleClose}>In Post</MenuItem>
    //             </Link>
    //             <Link to="/contents/done">
    //               <MenuItem onClick={handleClose}>Done</MenuItem>
    //             </Link>
    //           </Menu>
    //           <NavLink
    //             to={`/logos/`}
    //             className="navLink"
    //             activeclassname="active"
    //           >
    //             LOGO
    //           </NavLink>

    //           {user && (
    //             <div
    //               className="navLink"
    //               // activeclassname="active"
    //               onClick={logoutHandle}
    //             >
    //               LOGOUT
    //             </div>
    //           )}
    //         </Grid>

    //         <Grid
    //           item
    //           xs={0}
    //           sm={4}
    //           md={3}
    //           lg={3}
    //           display={{ xs: "none", sm: "flex", md: "flex" }}
    //           // sx={{ display: "flex" }}
    //           container
    //           justifyContent="flex-end"
    //           alignItems="center"
    //         >
    //           {!user && (
    //             <>
    //               <NavLink
    //                 to="/login"
    //                 className="navLink"
    //                 activeclassname="active"
    //               >
    //                 LOGIN
    //               </NavLink>
    //               <NavLink
    //                 to="/signup"
    //                 className="navLink"
    //                 activeclassname="active"
    //               >
    //                 SIGN UP
    //               </NavLink>
    //             </>
    //           )}
    //           {user && (
    //             <NavLink
    //               to="/setting"
    //               className="navLink"
    //               activeClassName="active"
    //             >
    //               <Box sx={{ display: "flex", alignItems: "center" }}>
    //                 <Typography variant="h6" sx={{ mr: 2 }}>
    //                   {user.username}
    //                 </Typography>
    //                 <Avatar
    //                   src={user.profilePic.url ? user.profilePic.url : ""}
    //                 />
    //               </Box>
    //             </NavLink>
    //           )}
    //         </Grid>

    //         <Grid item xs={0} sm={0} md={0} lg={1}></Grid>
    //       </Grid>
    //     </Toolbar>
    //   </AppBar>
    // </Box>
  );
}
