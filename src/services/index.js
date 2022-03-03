// import { post, posts } from "../constants/dummy";
import Get from "./Get";
import Post from "./Post";
import Delete from "./Delete";
import Put from "./Put";
import UploadFile from "./UploadFile";
import DeleteFile from "./DeleteFile";

// GET
const getSomething = (data) =>
  Get(`SOMETHING?page=${data.page}&limit=${data.limit}`);

// POST
const login = (data) => Post("auth/login", data);
const signup = (data) => Post("auth/signup", data);
const uploadFile = (file) => UploadFile(file, "miniblog");
const createSomething = (data) => Post("something", data);

// PUT
const updateSomething = (data) => Put(`Somethings/${data.id}`, data);

// DELETE
const deleteSomething = (id) => Delete(`something/${id}`);
const deleteFile = (filename) => DeleteFile("miniblog", filename);

const API = {
  getSomething,
  login,
  signup,
  createSomething,
  uploadFile,
  updateSomething,
  deleteSomething,
  deleteFile,
};

export default API;
