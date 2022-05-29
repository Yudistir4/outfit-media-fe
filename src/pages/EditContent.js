import React, { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useParams } from "react-router-dom";
import FormReviewOutfit from "../components/editContent/FormReviewOutfit";
import FormStory from "../components/editContent/FormStory";
import FormFeed from "../components/editContent/FormFeed";
import API from "../services";

// const VALIDATION =

const Edit = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const result = await API.getContent(id);
        console.log(result);
        setData(result);
        setIsFetching(false);
      } catch (error) {
        setIsFetching(false);
        console.log("GAGAL get data data");
      }
    };
    getData();
  }, [id]);

  return (
    <React.Fragment>
      {data && !isFetching && (
        <>
          {data.contentType === "reviewOutfit" && (
            <FormReviewOutfit data={data} />
          )}
          {data.contentType === "story" && <FormStory data={data} />}
          {data.contentType === "feed" && <FormFeed data={data} />}
        </>
      )}
      {isFetching && (
        <div className="w-full h-[88vh] flex justify-center items-center">
          {" "}
          <AiOutlineLoading3Quarters className="animate-spin" size="2rem" />
        </div>
      )}{" "}
    </React.Fragment>
  );
};

export default Edit;
