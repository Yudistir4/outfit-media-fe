import { saveAs } from "file-saver";

const DownloadFileFirebase = (url, filename) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onload = () => {
    const blob = xhr.response;
    saveAs(blob, filename);
  };
  xhr.open("GET", url);
  xhr.send();
};

export default DownloadFileFirebase;
