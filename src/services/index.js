// import { post, posts } from "../constants/dummy";
import Get from "./Get";
import Post from "./Post";
import Delete from "./Delete";
import Put from "./Put";
import UploadFile from "./UploadFile";
import DeleteFile from "./DeleteFile";
import DownloadFileFirebase from "./DownloadFileFirebase";

const convertToQueryStr = (query) => {
  let result = "";
  for (const key in query) {
    result += `&${key}=${query[key]}`;
  }
  return result.replace("&", "?");
};
// GET

const getInfluencersPosts = ({ page, limit }) =>
  Get(`influencers/posts?page=${page}&limit=${limit}`);
const getPosts = ({ query, limit, page }) =>
  Get(`posts?query=${query}&limit=${limit}&page=${page}`);
const getFeed = (id) => Get(`feeds/${id}`);
const getFeeds = (query) => Get(`feeds${convertToQueryStr(query)}`);
const getFeedsNotif = () => Get(`feeds/notif`);
const getProducts = ({ productName }) =>
  Get(`products?productName=${productName}`);
const getLogo = (id) => Get(`logos/${id}`);
const getLogos = (query) => Get(`logos${convertToQueryStr(query)}`);
const getRemovebgs = (query) => Get(`removebg${convertToQueryStr(query)}`);
const getRemovebg = () => Get(`removebg/apikey`);

// POST
const login = (data) => Post("auth/login", data);
const signup = (data) => Post("auth/signup", data);
const uploadFile = (file, path) => UploadFile(file, path);
const createInfluencer = (data) => Post("influencers", data);
const createPost = (data) => Post("posts", data);
const createProduct = (data) => Post("products", data);
const createFeed = (data) => Post("feeds", data);
const createLogo = (data) => Post("logos", data);
const getLogoByUsername = (username) => Post(`logos/${username}`);
const getShopee = (data) => Post("shopees", data);
const getShortLink = (data) => Post("shopees/shortlink", data);
// const removebg = (data) => Post("removebg", data);

// PUT
const updateInfluencer = (data) => Put(`influencers/${data.id}`, data);
const updatePost = (data) => Put(`posts/${data.id}`, data);
const updateFeed = (data) => Put(`feeds/${data.id}`, data);
const updateLogo = (data) => Put(`logos/${data.id}`, data);
const updateRemovebg = (data) => Put(`removebg/${data.id}`, data);

// DELETE
const deleteInfluencerAndPosts = (id) => Delete(`influencers/${id}/posts`);
const deleteFeed = (id) => Delete(`feeds/${id}`);
const deleteLogo = (id) => Delete(`logos/${id}`);
const deleteFile = (folder, filename) => DeleteFile(folder, filename);

const API = {
  DownloadFileFirebase,
  getInfluencersPosts,
  getPosts,
  getFeed,
  getFeeds,
  getProducts,
  getLogos,
  getLogo,
  getRemovebgs,
  getRemovebg,
  getFeedsNotif,
  login,
  signup,
  createInfluencer,
  createPost,
  createProduct,
  createFeed,
  createLogo,
  // removebg,
  getLogoByUsername,
  getShopee,
  getShortLink,
  uploadFile,
  updateInfluencer,
  updatePost,
  updateFeed,
  updateRemovebg,
  updateLogo,
  deleteInfluencerAndPosts,
  deleteFile,
  deleteFeed,
  deleteLogo,
};

export default API;
