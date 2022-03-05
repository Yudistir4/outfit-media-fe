// import { post, posts } from "../constants/dummy";
import Get from "./Get";
import Post from "./Post";
import Delete from "./Delete";
import Put from "./Put";
import UploadFile from "./UploadFile";
import DeleteFile from "./DeleteFile";

// GET
const getInfluencersPosts = ({ page, limit }) =>
  Get(`influencers/posts?page=${page}&limit=${limit}`);

// POST
const login = (data) => Post("auth/login", data);
const signup = (data) => Post("auth/signup", data);
const uploadFile = (file) => UploadFile(file, "miniblog");
const createSomething = (data) => Post("something", data);

// PUT
const updateInfluencer = (data) => Put(`influencers/${data.id}`, data);
const updatePost = (data) => Put(`posts/${data.id}`, data);

// DELETE
const deleteSomething = (id) => Delete(`something/${id}`);
const deleteFile = (filename) => DeleteFile("miniblog", filename);

const API = {
  getInfluencersPosts,
  login,
  signup,
  createSomething,
  uploadFile,
  updateInfluencer,
  updatePost,
  deleteSomething,
  deleteFile,
};

export default API;
