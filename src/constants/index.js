import { v4 as uuidv4 } from "uuid";

export const initState = {
  reviewOutfit: createContent(reviewOutfit),
  story: createContent(story),
};

const createContent = (contentType) => {
  return {
    // id: "2",
    account: "outfitgram.id",
    contentType: "reviewOutfit",
    status: "inProgress",
    schedule: "",
    deadline: "",
    revisi: [],
    note: "",
    content: {
      contentType,
    },
  };
};

const story = {
  materi: { url: "", filename: "", fileType: "" },
  tags: [],
  link: "",
};

const reviewOutfit = {
  generateCaptions: "",
  linkPost: "",
  displayImg: [
    {
      id: "display" + uuidv4(),
      link: null,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      draggable: true,
    },
  ],
  halaman: 1,
  author: "",
  captions: "",
  products: [
    {
      id: "p" + uuidv4(),
      halaman: 1,
      urutan: 1,
      productName: "",
      linkNo: "",
      linkAffiliate: "",
      shortLink: "",
      price: {
        id: "price" + uuidv4(),
        text: "",
        x: 68.935,
        y: 28.6,
        width: 25,
        height: 3,
        align: "center",
        fontSize: 3,
        draggable: true,
      },
      img: {
        id: "img" + uuidv4(),
        link: null,
        x: 71.435,
        y: 7.2,
        width: 20,
        height: 20,
        draggable: true,
      },
      logo: {
        id: "logo" + uuidv4(),
        radius: true,
        username: "",
        link: null,
        x: 78.435,
        y: 0.71,
        width: 6,
        height: 6,
        draggable: true,
      },
    },
    {
      id: "p" + uuidv4(),

      halaman: 1,
      urutan: 2,
      productName: "",
      linkNo: "",
      linkAffiliate: "",
      shortLink: "",
      price: {
        id: "price" + uuidv4(),
        text: "",
        x: 68.935,
        y: 61.94,
        fontSize: 3,
        width: 25,
        height: 3,
        draggable: true,
      },
      img: {
        id: "img" + uuidv4(),
        link: null,
        x: 71.435,
        y: 40.5,
        width: 20,
        height: 20,
        draggable: true,
      },
      logo: {
        id: "logo" + uuidv4(),
        radius: true,
        username: "",
        link: null,
        x: 78.435,
        y: 34.1,
        width: 6,
        height: 6,
        draggable: true,
      },
    },
    {
      id: "p" + uuidv4(),

      halaman: 1,
      urutan: 3,
      productName: "",
      linkNo: "",
      linkAffiliate: "",
      shortLink: "",
      price: {
        id: "price" + uuidv4(),
        text: "",
        x: 68.935,
        y: 85.74,
        fontSize: 3,
        width: 25,
        height: 3,
        draggable: true,
      },
      img: {
        id: "img" + uuidv4(),
        link: null,
        x: 71.435,
        y: 73.8,
        width: 20,
        height: 20,
        draggable: true,
      },
      logo: {
        id: "logo" + uuidv4(),
        username: "",
        radius: true,
        link: null,
        x: 78.435,
        y: 66.8,
        width: 6,
        height: 6,
        draggable: true,
      },
    },
  ],
};
