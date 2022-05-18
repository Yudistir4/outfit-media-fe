import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import useQuery from "../hooks/useQuery";

import AddLogoModal from "../components/logos/AddLogoModal";
import EditLogoModal from "../components/logos/EditLogoModal";
import Pagination from "@mui/material/Pagination";

import API from "../services";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import useDialog from "../hooks/useDialog";

import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
let i = 0;
const Feeds = () => {
  console.log(i);
  i++;
  const [logos, setLogos] = useState();
  const history = useHistory();
  const [input, setInput] = useState("");

  const query = useQuery();
  const page = parseInt(query.get("page")) || 1;
  const limit = parseInt(query.get("limit")) || 10;
  const handleChange = (event, value) => {
    history.push("/logos?page=" + value);
  };
  const { createDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();

  const getLogos = async () => {
    const data = await API.getLogos({ page, limit, sort: "-createdAt" });
    console.log(data);
    setLogos(data);
  };
  useEffect(() => {
    let search;
    if (input) {
      console.log("MASUK");
      search = setTimeout(async () => {
        try {
          const res = await API.getLogos({ username: input });
          setLogos(res);
        } catch (error) {
          console.log(error);
        }
      }, 500);
    } else {
      getLogos();
    }

    return () => {
      clearTimeout(search);
    };
  }, [page, limit, input]);

  // useEffect(() => {
  //   const search = setTimeout(async () => {
  //     try {
  //       console.log("Get USERNAME");
  //       if (input) {
  //         const res = await API.getLogos({ page: 1, username: input });
  //         setLogos(res);
  //         console.log("Get USERNAME1");
  //       } else {
  //         getLogos();
  //         console.log("Get USERNAME2");
  //       }
  //       // console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, 1000);

  //   return () => {
  //     clearTimeout(search);
  //   };
  // }, [input]);

  const addLogo = async () => {
    // const data = await API.createLogo(createPost);
    // history.push(`/logos/${data._id}`);
    try {
      createDialog({
        title: "Delete Logo",
        contentWithButton: <AddLogoModal />,
        allowClose: false,
      })
        .then(async () => {
          try {
            console.log("confirm");
            getLogos();
          } catch (error) {
            // enqueueSnackbar("Tambah Logo Gagal", { variant: "error" });
          }
        })
        .catch(() => {
          console.log("cancelation");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const editLogo = async (id) => {
    try {
      const logo = await API.getLogo(id);
      createDialog({
        title: "Edit Logo",
        contentWithButton: <EditLogoModal logo={logo} />,
        allowClose: false,
      })
        .then(async () => {
          try {
            await getLogos();
            // enqueueSnackbar("Delete Logo Success", { variant: "success" });
          } catch (error) {
            enqueueSnackbar("Delete Logo Gagal", { variant: "error" });
          }
        })
        .catch(() => {
          console.log("cancelation");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLogo = async (id) => {
    try {
      createDialog({ title: "Delete Logo", description: "Yakin delete Logo?" })
        .then(async () => {
          try {
            console.log("confirm");
            await API.deleteLogo(id);
            await getLogos();
            enqueueSnackbar("Delete Logo Success", { variant: "success" });
          } catch (error) {
            enqueueSnackbar("Delete Logo Gagal", { variant: "error" });
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
        <Button variant="contained" color="primary" onClick={addLogo}>
          ADD LOGO
        </Button>
        <input
          // onFocus={() => setOnFocus(true)}
          onChange={(e) => setInput(e.target.value)}
          // onBlur={() => {
          //   if (!hover) {
          //     setFocus(false);
          //   }
          // }}
          type="search"
          value={input}
          className="mt-3 relative flex-auto min-w-0 block w-full px-5 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Search"
        />
        {/* <table className="table-auto w-full drop-shadow-xl mb-10">
          <thead className="">
            <tr className="">
              <th className="text-left p-3">NO</th>
              <th className="text-left p-3">USERNAME</th>
              <th className="text-left p-3">IMAGE</th>
              <th className="text-center p-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody> */}
        <div className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-3  mt-3">
          {logos &&
            logos.docs.map((value, i) => (
              <div
                key={i}
                className="cursor-pointer p-2 relative aspect-square transition-all  border-gray-400 border-solid border-[1px] flex flex-col justify-center items-center rounded-lg overflow-hidden drop-shadow-xl"
              >
                <div className="z-10 bg-black bg-opacity-50 hover:opacity-100 opacity-0 flex transition-all duration-300 absolute w-full h-full items-center justify-evenly">
                  <button
                    onClick={() => editLogo(value._id)}
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 transition-all w-[40%] h-[40%] rounded-full flex justify-center items-center"
                  >
                    <MdModeEditOutline color="white" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteLogo(value._id)}
                    className="bg-red-600 hover:bg-red-700 transition-all w-[40%] h-[40%] rounded-full flex justify-center items-center"
                  >
                    <MdDelete color="white" />
                  </button>
                </div>
                <div className="flex flex-col items-center justify-between w-full h-full">
                  <div className="flex items-center justify-center h-[70%]">
                    <img
                      className={`object-contain max-h-[100%] ${
                        value.radius ? "rounded-full" : ""
                      }`}
                      src={value.link}
                      alt=""
                    />
                  </div>
                  <p className="max-w-full truncate">{value.username}</p>
                </div>
              </div>
            ))}
        </div>

        {/* </tbody>
        </table> */}
        {logos && (
          <Grid item xs={12} justifyContent="center" container>
            <Pagination
              count={logos.totalPages}
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

export default Feeds;
