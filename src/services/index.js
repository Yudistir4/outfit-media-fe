// import { post, posts } from "../constants/dummy";
import Get from "./Get";
import Post from "./Post";
import Delete from "./Delete";
import Put from "./Put";
import UploadFile from "./UploadFile";
import DeleteFile from "./DeleteFile";
import DownloadFileFirebase from "./DownloadFileFirebase";

// GET

const getInfluencersPosts = ({ page, limit }) =>
  Get(`influencers/posts?page=${page}&limit=${limit}`);
const getPosts = ({ query, limit, page }) =>
  Get(`posts?query=${query}&limit=${limit}&page=${page}`);

// POST
const login = (data) => Post("auth/login", data);
const signup = (data) => Post("auth/signup", data);
const uploadFile = (file, path) => UploadFile(file, path);
const createInfluencer = (data) => Post("influencers", data);
const createPost = (data) => Post("posts", data);

// PUT
const updateInfluencer = (data) => Put(`influencers/${data.id}`, data);
const updatePost = (data) => Put(`posts/${data.id}`, data);

// DELETE
const deleteInfluencerAndPosts = (id) => Delete(`influencers/${id}/posts`);
const deleteFile = (filename) => DeleteFile("post ", filename);

const API = {
  DownloadFileFirebase,
  getInfluencersPosts,
  getPosts,
  login,
  signup,
  createInfluencer,
  createPost,
  uploadFile,
  updateInfluencer,
  updatePost,
  deleteInfluencerAndPosts,
  deleteFile,
};

export default API;
