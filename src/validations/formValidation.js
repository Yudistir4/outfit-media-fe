import * as Yup from "yup";
import { stripHtml } from "string-strip-html";

export const LOGIN_VALIDATION = Yup.object().shape({
  username: Yup.string().lowercase().required("wajib diisi"),
  password: Yup.string().required("wajib diisi"),
});

export const SIGNUP_VALIDATION = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim,
      "username hanya boleh menggunakan huruf, angka, garis bawah dan titik"
    )
    .min(3)
    .max(20)
    .lowercase()
    .required("wajib diisi"),
  email: Yup.string().email().required("wajib diisi"),
  password: Yup.string().required("wajib diisi").min(8),
  //     .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
  //     .matches(
  //       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //       "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  //     ),
});

export const COMMENT_VALIDATION = Yup.object().shape({
  comment: Yup.string().required("wajib diisi"),
});

const FILE_SIZE = 1000000;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const WRITE_VALIDATION = Yup.object().shape({
  title: Yup.string().required("wajib diisi"),
  desc: Yup.string()
    .test("require", "Wajib diisi", (v) => v && stripHtml(v).result.length > 0)
    .test(
      "max-char",
      "Ga boleh lebih dari 10 char",
      (v) => v && stripHtml(v).result.length <= 10
    ),
  image: Yup.mixed()
    .test("required", "A file is required", (v) => (v === "" ? false : true))
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size <= FILE_SIZE
    ),
});
export const UPDATE_POST_VALIDATION = Yup.object().shape({
  title: Yup.string().required("wajib diisi"),
  desc: Yup.string()
    .test("require", "Wajib diisi", (v) => v && stripHtml(v).result.length > 0)
    .test(
      "max-char",
      "Ga boleh lebih dari 10 char",
      (v) => v && stripHtml(v).result.length <= 10
    ),
  image: Yup.mixed()
    // .test("required", "A file is required", (v) => (v === "" ? false : true))
    .test("fileFormat", "Unsupported Format", (value) =>
      value === "" ? true : value && SUPPORTED_FORMATS.includes(value.type)
    )
    .test("fileSize", "File too large", (value) =>
      value === "" ? true : value && value.size <= FILE_SIZE
    ),
});
