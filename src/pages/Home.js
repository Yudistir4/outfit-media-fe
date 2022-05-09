import React, { useState } from "react";
import axios from "axios";
// import FormData, { getHeaders } from "form-data";
import API from "../services";
// import { v4 as uuidv4 } from "uuid";

function App() {
  const [imgUrl, setUrl] = useState("");
  const [imgData, setImgData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const getUrl = (e) => {
    const url = e.target.files[0];
    console.log(url);
    setUrl(url);
  };
  const removeBg = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("size", "auto");
      formData.append("image_file", imgUrl);
      const response = await axios({
        url: "https://api.remove.bg/v1.0/removebg",
        method: "post",
        data: formData,
        headers: {
          "X-Api-Key": "T99PaKz9G8vdGBpdUHTnha2R",
        },
        responseType: "blob",
        encoding: null,
      });
      console.log(response);
      response.data.name = ".png";
      console.log(await API.uploadFile(response.data, "testing"));

      setImgData(URL.createObjectURL(response.data));
      setUrl("");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    // .catch((e) => console.log(e, "something missing"));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 text-center">
          <h1 className="text-success my-5">
            Remove Background from image url VIA api call
          </h1>
          <div className="form-group">
            <form
              encType="multipart/form-data"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="file"
                className="form-control mb-5"
                placeholder="Enter image url"
                onChange={(e) => {
                  getUrl(e);
                }}
              />
              {isLoading ? (
                <p className="mt-5"> Loading please wait....</p>
              ) : (
                <button
                  className={isLoading ? "disable" : "btn btn-success"}
                  onClick={removeBg}
                  type="submit"
                >
                  Remove bg
                </button>
              )}
            </form>
          </div>

          {imgData && !isLoading && <img alt="bgremoved" src={imgData} />}
        </div>
      </div>
    </div>
  );
}

export default App;
