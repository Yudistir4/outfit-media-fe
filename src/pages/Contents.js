import React, { useState, useEffect } from "react";
// import { createContentReviewOutfit } from "../constants/dummy";
import { initState } from "../constants";
import Display from "../components/konva/Display";
import Grid from "@mui/material/Grid";
import useQuery from "../hooks/useQuery";
import { MdTimer } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import API from "../services";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import useDialog from "../hooks/useDialog";

const color = {
  pp: "bg-red-500",
  story: "bg-blue-500",
  feed: "bg-green-500",
  reels: "yellow",
  ga: "teal",
};

const Contents = () => {
  const [contents, setContents] = useState();
  const [isFetching, setIsFetching] = useState();
  const history = useHistory();
  // const { status } = useParams();
  const query = useQuery();
  const page = parseInt(query.get("page")) || 1;
  const limit = parseInt(query.get("limit")) || 10;
  const status = query.get("status");
  const handleChange = (event, value) => {
    history.push("/contents?page=" + value);
  };
  const { createDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();

  const getContents = async () => {
    setIsFetching(true);
    const data = await API.getContents({
      page,
      status,
      limit,
      sort: "-createdAt",
    });
    console.log(data);
    setIsFetching(false);
    setContents(data);
  };
  useEffect(() => {
    getContents();
  }, [status]);

  const addContent = async (contentType) => {
    const data = await API.createContent(initState[contentType]);
    history.push(`/contents/${data._id}`);
  };

  const deleteContent = async (id) => {
    try {
      createDialog({
        title: "Delete Content",
        description: "Yakin delete content?",
        onClickConfirm: () => API.deleteContent(id),
      })
        .then(async (status) => {
          try {
            console.log("status on Click : ", status);
            console.log("confirm");
            await getContents();
            enqueueSnackbar("Delete Content Success", { variant: "success" });
          } catch (error) {
            enqueueSnackbar("Delete Content Gagal", { variant: "error" });
          }
        })
        .catch(() => {
          console.log("cancelation");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <div className="flex gap-3">
          <Button
            variant="contained"
            color="primary"
            onClick={() => addContent("reviewOutfit")}
          >
            ADD REVIEW OUTFIT
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addContent("story")}
          >
            ADD STORY
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addContent("feed")}
          >
            ADD FEED
          </Button>
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-4 mb-10">
          {contents &&
            !isFetching &&
            contents.docs.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`group   relative shadow-lg ${
                    item.revisi.filter((val) => val.status === false).length > 0
                      ? "shadow-red-500"
                      : "shadow-gray-500"
                  }`}
                >
                  {status !== "done" && (
                    <div className="z-10 h-8 w-full text-sm px-3 gap-2 transition-all bg-black text-white flex justify-between items-center rounded-t-lg">
                      <div className="flex items-center ">
                        <MdTimer className="mr-1" />
                        <h5 className="text-xs">
                          {item[
                            status === "inProgress" || status === "inReview"
                              ? "deadline"
                              : "schedule"
                          ] &&
                            new Date(
                              item[
                                status === "inProgress" || status === "inReview"
                                  ? "deadline"
                                  : "schedule"
                              ]
                            ).toLocaleString("id-ID", {
                              weekday: "long",
                              // year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            })}
                        </h5>
                      </div>
                      <div className="gap-2 flex items-center">
                        {item.isPP && (
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                          </span>
                        )}
                        {item.contentType !== "reviewOutfit" && (
                          <span className="relative flex h-3 w-3">
                            <span
                              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                                color[item.contentType]
                              } opacity-75`}
                            ></span>
                            <span
                              className={`relative inline-flex rounded-full h-3 w-3 ${
                                color[item.contentType]
                              }`}
                            ></span>
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <div
                    className={`group bg-black bg-opacity-50 hover:opacity-100 opacity-0  z-10 absolute duration-500 transition-all flex  w-full   aspect-square justify-evenly items-center`}
                  >
                    {/* <Link to={`contents/${item._id}`}> */}
                    <Link
                      to={`/contents/${item._id}`}
                      className="flex items-center justify-center cursor-pointer w-[30%] h-[30%] duration-500 bg-blue-500 hover:bg-blue-600 rounded-full transition-all"
                    >
                      <EditIcon className="text-white" />
                    </Link>
                    {/* </Link> */}

                    <div
                      onClick={() => deleteContent(item._id)}
                      className="flex items-center justify-center cursor-pointer w-[30%] h-[30%] duration-500 bg-red-500 hover:bg-red-600 rounded-full transition-all"
                    >
                      <DeleteIcon className="text-white" />
                    </div>
                  </div>
                  {item.contentType === "reviewOutfit" && (
                    <Display initPost={item.content.reviewOutfit} />
                  )}

                  {item.contentType === "story" && (
                    <>
                      {item.content.story.materi.url ? (
                        <>
                          {item.content.story.materi.fileType === "video" ? (
                            <video
                              className="aspect-square object-cover w-full"
                              src={item.content.story.materi.url}
                            />
                          ) : (
                            <img
                              className="aspect-square object-cover w-full"
                              src={item.content.story.materi.url}
                            />
                          )}
                        </>
                      ) : (
                        <div className="aspect-square"></div>
                      )}
                    </>
                  )}
                  {item.contentType === "feed" && (
                    <>
                      {item.content.feed.materi.length > 0 ? (
                        <>
                          {item.content.feed.materi[0].fileType === "video" ? (
                            <video
                              className="aspect-square object-cover w-full"
                              src={item.content.feed.materi[0].url}
                            />
                          ) : (
                            <img
                              className="aspect-square object-cover w-full"
                              src={item.content.feed.materi[0].url}
                            />
                          )}
                        </>
                      ) : (
                        <div className="aspect-square"></div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
        </div>
        {isFetching && (
          <div className="w-full h-[60vh]  flex justify-center items-center">
            {" "}
            <AiOutlineLoading3Quarters className="animate-spin" size="1.5rem" />
          </div>
        )}
        {contents && !isFetching && (
          <Grid item xs={12} justifyContent="center" container>
            <Pagination
              count={contents.totalPages}
              page={page}
              onChange={handleChange}
              sx={{ m: "auto" }}
            />
          </Grid>
        )}
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default Contents;
