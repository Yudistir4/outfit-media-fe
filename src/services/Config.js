import { initializeApp } from "firebase/app";
export const rootPath = "http://localhost:5000/";
// export const rootPath = "https://outfit-media.herokuapp.com/";

export const firebaseConfig = {
  apiKey: "AIzaSyAN0nUlg4ue39o07RDpk7vRSnL5kU5FCF4",
  authDomain: "react-542dd.firebaseapp.com",
  databaseURL:
    "https://react-542dd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-542dd",
  storageBucket: "react-542dd.appspot.com",
  messagingSenderId: "110567170274",
  appId: "1:110567170274:web:7510832c51c29369dd3ebb",
  measurementId: "G-1K0NV7G8KQ",
};

initializeApp(firebaseConfig);
