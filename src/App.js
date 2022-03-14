import { CssBaseline, Button } from "@mui/material";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Appbar from "./components/Appbar";
import "./App.css";
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
      </Router>
    </div>
  );
}

export default App;
