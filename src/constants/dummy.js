import kaos from "../assets/kaos.png";
import sepatu from "../assets/sepatu.png";
// import example1 from "../assets/example1.png";
import simanis from "../assets/simanis.jpg";
import template from "../assets/template-kosong.png";
import logo from "../assets/logo.jpg";
import { v4 as uuidv4 } from "uuid";

export const position = [
  {
    price: { x: 68.935, y: 28.6 },
    logo: { x: 78.435, y: 0.71 },
    img: { x: 71.435, y: 7.2 },
  },
  {
    price: { x: 68.935, y: 61.94 },
    logo: { x: 78.435, y: 34.1 },
    img: { x: 71.435, y: 40.5 },
  },
  {
    price: { x: 68.935, y: 85.74 },
    logo: { x: 78.435, y: 66.8 },
    img: { x: 71.435, y: 73.8 },
  },
];

export const generatePosition = (value, urutan) => {
  let pengurang = position[urutan - 1].logo.y;
  let bilangan = value.logo.y - pengurang;
  return {
    ...value,
    price: { ...value.price, y: value.price.y - bilangan },
    img: { ...value.img, y: value.img.y - bilangan },
    logo: { ...value.logo, y: value.logo.y - bilangan },
  };
};

export const Template = {
  id: "template",
  link: template,
  x: 60,
  y: 0,
  width: 40,
  height: 100,
  transform: false,
};

export const createContentReviewOutfit = {
  // id: "2",
  account: "outfitgram.id",
  contentType: "reviewOutfit",
  status: "inProgress",
  schedule: "",
  deadline: "",
  revisi: [],
  note: "",
  content: {
    reviewOutfit: {
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
    },
  },
};
export const createPost = {
  // id: "2",
  note: "",
  status: "inProgress",
  linkPost: "",
  revisi: [],
  generateCaptions: "",
  jadwalPost: "",
  deadline: "",
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

export const products = [
  {
    id: "p1" + Date.now(),
    // halaman: 1,
    // urutan: 1,
    productName: "Kaos ",
    linkNo: "12",
    linkAffiliate: "link",
    price: {
      id: "price" + Date.now(),
      text: "Rp200.000",
      x: 68.935,
      y: 28.6,
      width: 25,
      height: 3,
      align: "center",
      fontSize: 3,
      draggable: true,
    },
    img: {
      id: "img" + Date.now(),
      link: "https://firebasestorage.googleapis.com/v0/b/react-542dd.appspot.com/o/dummy%2F54278c03-7443-4eef-b15d-7b8a3e921189.jpg?alt=media&token=7e44e2d8-31d6-4a63-8c9a-b5228ccf7735",
      x: 71.435,
      y: 7.2,
      width: 20,
      height: 20,
      draggable: true,
    },
    logo: {
      id: "logo" + Date.now(),
      radius: true,
      username: "karungjantan",
      link: logo,
      x: 78.435,
      y: 0.71,
      width: 6,
      height: 6,
      draggable: true,
    },
  },
  {
    id: "p2" + Date.now(),
    // halaman: 1,
    // urutan: 2,
    productName: "Celana",
    linkNo: "14",
    linkAffiliate: "linkqerwer2342",
    price: {
      id: "price" + Date.now(),
      text: "Rp100.000",
      x: 68.935,
      y: 61.94,
      fontSize: 3,
      width: 25,
      height: 3,
      draggable: true,
    },
    img: {
      id: "img" + Date.now(),
      link: "https://firebasestorage.googleapis.com/v0/b/react-542dd.appspot.com/o/dummy%2F319e05d7-d7b0-48c0-ae1a-0c2782af68fd.jpg?alt=media&token=cf312042-b963-4b2c-ac16-42904b96131c",
      x: 71.435,
      y: 40.5,
      width: 20,
      height: 20,
      draggable: true,
    },
    logo: {
      id: "logo" + Date.now(),
      radius: true,
      username: "nike",
      link: logo,
      x: 78.435,
      y: 34.1,
      width: 6,
      height: 6,
      draggable: true,
    },
  },
  {
    id: "p3" + Date.now(),
    // halaman: 1,
    // urutan: 3,
    productName: "Nike Af1",
    linkNo: "77",
    linkAffiliate: "link129",
    price: {
      id: "price" + Date.now(),
      text: "Rp50.000",
      x: 68.935,
      y: 84,
      fontSize: 3,
      width: 25,
      height: 3,
      draggable: true,
    },
    img: {
      id: "img" + Date.now(),
      link: sepatu,
      x: 71.435,
      y: 70,
      width: 20,
      height: 15,
      draggable: true,
    },
    logo: {
      id: "logo" + Date.now(),
      username: "naike",
      radius: true,
      link: logo,
      x: 85,
      y: 69.7,
      width: 6,
      height: 6,
      draggable: true,
    },
  },
];

export const generateProduct = (halaman, urutan) => {
  return {
    id: "p" + Date.now(),
    halaman,
    urutan,
    productName: "",
    linkAffiliate: "",
    linkNo: "",
    price: {
      id: "price" + Date.now(),
      text: "",
      x: position[urutan - 1].price.x,
      y: position[urutan - 1].price.y,
      fontSize: 3,
      width: 25,
      height: 3,
      draggable: true,
    },
    img: {
      id: "img" + Date.now(),
      link: null,
      x: position[urutan - 1].img.x,
      y: position[urutan - 1].img.y,
      width: 20,
      height: 20,
      draggable: true,
    },
    logo: {
      username: "",
      id: "logo" + Date.now(),
      link: null,
      x: position[urutan - 1].logo.x,
      y: position[urutan - 1].logo.y,
      width: 6,
      height: 6,
      draggable: true,
    },
  };
};

export const getPost = {
  id: "2",
  status: "inProgress",
  generateCaptions: "",
  displayImg: [
    {
      id: "imgPost1",
      link: "https://firebasestorage.googleapis.com/v0/b/react-542dd.appspot.com/o/post%2F2ea294cd-eba7-41b0-bc36-431b693c7104.jpg?alt=media&token=8d56986b-8fcc-4aa4-a0c5-ac6f1cf5fe9c",
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      draggable: true,
    },
    {
      id: "imgPost2",
      link: simanis,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      draggable: true,
    },
  ],

  halaman: 2,
  author: "Maisan",
  captions: "lorem10",
  products: [
    {
      id: "p1",
      halaman: 1,
      urutan: 1,
      productName: "Kaos",
      linkNo: 12,
      linkAffiliate: "",
      price: {
        id: "price1",
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
        id: "img1",
        link: kaos,
        x: 71.435,
        y: 7.2,
        width: 20,
        height: 20,
        draggable: true,
      },
      logo: {
        radius: true,
        username: "nike",
        id: "logo1",
        link: null,
        x: 78.435,
        y: 0.71,
        width: 6,
        height: 6,
        draggable: true,
      },
    },
    {
      id: "p2",
      halaman: 1,
      urutan: 2,
      productName: "Celana",
      linkNo: 12,
      linkAffiliate: "",
      price: {
        id: "price2",
        text: "Rp31.000.000",
        x: 68.935,
        y: 61.94,
        fontSize: 3,
        width: 25,
        height: 3,
        draggable: true,
      },
      img: {
        id: "img2",
        link: kaos,
        x: 71.435,
        y: 40.5,
        width: 20,
        height: 20,
        draggable: true,
      },
      logo: {
        radius: true,

        username: "nike",
        id: "logo2",
        link: logo,
        x: 78.435,
        y: 34.1,
        width: 6,
        height: 6,
        draggable: true,
      },
    },
    {
      id: "p3",
      halaman: 1,
      urutan: 3,
      productName: "Sepatu Nike AF1",
      linkNo: 12,
      linkAffiliate: "",
      price: {
        id: "price3",
        text: "Rp6.000.000",
        x: 68.935,
        y: 85.74,
        fontSize: 3,
        width: 25,
        height: 3,
        draggable: true,
      },
      img: {
        id: "img3",
        link: sepatu,
        x: 71.435,
        y: 73.8,
        width: 20,
        height: 20,
        draggable: true,
      },
      logo: {
        username: "karungjantan",
        radius: true,

        id: "logo3",
        link: logo,
        x: 78.435,
        y: 66.8,
        width: 6,
        height: 6,
        draggable: true,
      },
    },
    {
      id: "p4",
      halaman: 2,
      urutan: 1,
      productName: "Kaos",
      linkNo: 12,
      linkAffiliate: "",
      price: {
        id: "price1",
        text: "Rp100.000",
        x: 68.935,
        y: 28.6,
        width: 25,
        height: 3,
        align: "center",
        fontSize: 3,
        draggable: true,
      },
      img: {
        id: "img4",
        link: kaos,
        x: 71.435,
        y: 7.2,
        width: 20,
        height: 20,
        draggable: true,
      },
      logo: {
        username: "nike",
        id: "logo1",
        link: logo,
        x: 78.435,
        y: 0.71,
        width: 6,
        height: 6,
        draggable: true,
      },
    },
    {
      id: "p5",
      halaman: 2,
      urutan: 2,
      productName: "Celana",
      linkNo: 12,
      linkAffiliate: "",
      price: {
        id: "price2",
        text: "Rp31.000.000",
        x: 68.935,
        y: 61.94,
        fontSize: 3,
        width: 25,
        height: 3,
        draggable: true,
      },
      img: {
        id: "img5",
        link: kaos,
        x: 71.435,
        y: 40.5,
        width: 20,
        height: 20,
        draggable: true,
      },
      logo: {
        username: "nike",
        id: "logo2",
        link: logo,
        x: 78.435,
        y: 34.1,
        width: 6,
        height: 6,
        draggable: true,
      },
    },
  ],
};

export const inProgress = [
  getPost,
  getPost,
  getPost,
  getPost,
  getPost,
  getPost,
  getPost,
  getPost,
  getPost,
];

export const menuData = [
  { value: 10, label: "Sepuluh" },
  { value: 20, label: "dua puluh" },
  { value: 30, label: "tiga puluh" },
];

export const tags = [
  "#outfitgram",
  "#outfitgramindo",
  "#outfitindonesia",
  "#outfitoftheday",
  "#outfitinspiration",
  "#outfitmen",
  "#indonesianoutfit",
  "#ootdmen",
  "#ootdwomen",
  "#ootdindo",
  "#outfit",
];
