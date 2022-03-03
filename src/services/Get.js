import axios from "axios";
import { rootPath } from "./Config";

const Get = async (path, dummy) => {
  if (dummy) {
    return new Promise((resolve) => setTimeout(() => resolve(dummy), 2000));
  }
  try {
    const res = await axios.get(`${rootPath}${path}`);
    return res.data;
  } catch (error) {
    console.log("Error GET:", error.response.data);
    throw error;
  }
};

export default Get;
