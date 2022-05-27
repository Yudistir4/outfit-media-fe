import { saveAs } from "file-saver";

const DownloadFileFirebase = (url, filename) => {
  return new Promise((res, rej) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = () => {
        const blob = xhr.response;
        saveAs(blob, filename);
        res();
      };
      xhr.open("GET", url);
      xhr.send();
    } catch (error) {
      rej(error);
    }
  });
};

export default DownloadFileFirebase;
