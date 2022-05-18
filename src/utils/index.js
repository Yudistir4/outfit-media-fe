const downloadFile = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onload = (event) => {
    const blob = xhr.response;
    console.log(blob);

    saveAs(blob, "image.jpg");
  };
  xhr.open("GET", "https://www.instagram.com/gcantikap/?__a=1");
  xhr.send();
};
