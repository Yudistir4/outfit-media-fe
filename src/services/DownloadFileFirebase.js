import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();
const DownloadFileFirebase = () => {
  getDownloadURL(ref(storage, "post/2ea294cd-eba7-41b0-bc36-431b693c7104.jpg"))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();

      // Or inserted into an <img> element
      const img = document.getElementById("myimg");
      img.setAttribute("src", url);
    })
    .catch((error) => {
      // Handle any errors
    });
};

export default DownloadFileFirebase;
