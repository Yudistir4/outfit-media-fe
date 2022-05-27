import React from "react";
// import { CssBaseline } from "@mui/material";
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

import { useAuth } from "./store/Auth";

import Login from "./pages/Login";
import Influencer from "./pages/Influencer";
import Posts from "./pages/Posts";
// import EditFeed from "./pages/EditFeed";
// import Feeds from "./pages/Feeds";
import Logos from "./pages/Logos";
import Home from "./pages/Home";
import Contents from "./pages/Contents";
import EditContent from "./pages/EditContent";
import Example from "./pages/Example";

function App() {
  const { user } = useAuth();

  return (
    <div>
      {/* <CssBaseline /> */}
      <Router>
        {user ? (
          <>
            <Appbar />

            <Route path="/" exact>
              <Redirect to="/contents?status=inProgress" />
            </Route>
            <Route path="/influencers">
              <Influencer />
            </Route>

            <Route path="/posts">
              <Posts />
            </Route>
            {/* <Route path="/feeds-status/:status">
              <Feeds />
            </Route> */}
            <Route path="/contents" exact>
              <Contents />
            </Route>
            <Route path="/contents/:id">
              <EditContent />
            </Route>

            {/* <Route path="/feeds/:id">
              <EditFeed />
            </Route> */}
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/logos">
              <Logos />
            </Route>
            <Route path="/example">
              <Example />
            </Route>
          </>
        ) : (
          <>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
