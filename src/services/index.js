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
const getFeed = (id) => Get(`feeds/${id}`);
const getFeeds = ({ status, limit, page }) =>
  Get(`feeds?page=${page}&limit=${limit}&status=${status}`);
const getProducts = ({ productName }) =>
  Get(`products?productName=${productName}`);
const getLogos = ({ username }) => Get(`logos?username=${username}`);

// POST
const login = (data) => Post("auth/login", data);
const signup = (data) => Post("auth/signup", data);
const uploadFile = (file, path) => UploadFile(file, path);
const createInfluencer = (data) => Post("influencers", data);
const createPost = (data) => Post("posts", data);
const createProduct = (data) => Post("products", data);
const createFeed = (data) => Post("feeds", data);
const getShopee = (data) => Post("shopees", data);

// PUT
const updateInfluencer = (data) => Put(`influencers/${data.id}`, data);
const updatePost = (data) => Put(`posts/${data.id}`, data);
const updateFeed = (data) => Put(`feeds/${data.id}`, data);

// DELETE
const deleteInfluencerAndPosts = (id) => Delete(`influencers/${id}/posts`);
const deleteFeed = (id) => Delete(`feeds/${id}`);
const deleteFile = (filename) => DeleteFile("post ", filename);

const API = {
  DownloadFileFirebase,
  getInfluencersPosts,
  getPosts,
  getFeed,
  getFeeds,
  getProducts,
  getLogos,
  login,
  signup,
  createInfluencer,
  createPost,
  createProduct,
  createFeed,
  getShopee,
  uploadFile,
  updateInfluencer,
  updatePost,
  updateFeed,
  deleteInfluencerAndPosts,
  deleteFile,
};

export default API;
