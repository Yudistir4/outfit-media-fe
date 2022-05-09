import React from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Appbar from "./components/Appbar";
import "./App.css";
import "./style.css";
// import Form from "./example/Form";
// import Topbar from "./core/navigation/Appbar";
// import Menu from "./example/Menu";
// import MyDialog from "./core/feedback/MyDialog";
// import Theme from "./example/Theme";
// import DarkMode from "./example/DarkMode";
// import Snackbar from "./example/Snackbar";
// import Contoh from "./example/customize/Contoh1";
import Influencer from "./pages/Influencer";
import Posts from "./pages/Posts";
import Konva from "./pages/Konva";
import EditFeed from "./pages/EditFeed";
import Feeds from "./pages/Feeds";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <CssBaseline />
      <Router>
        <Appbar />
        <Route path="/" exact>
          <Redirect to="/influencers" />
        </Route>
        <Route path="/influencers">
          <Influencer />
        </Route>
        <Route path="/posts">
          <Posts />
        </Route>
        <Route path="/feeds-status/:status">
          <Feeds />
        </Route>
        <Route path="/konva">
          <Konva />
        </Route>

        <Route path="/feeds/:id">
          <EditFeed />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        {/* <Route path="/edit">
          <Edit />
        </Route> */}
      </Router>
    </div>
  );
}

export default App;
