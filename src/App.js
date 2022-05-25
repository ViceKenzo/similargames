import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import NavBarWrapper from "./components/NavBarWrapper";
import Footer from "./components/Footer.jsx";
import BrowsePageWrapper from "./pages/BrowsePageWrapper";
import GameDetailPageWrapper from "./pages/GameDetailPageWrapper.jsx";
import backgroundImage from "./images/main_background.svg";
import Config from "./config/config.js";

function App() {
  return (
    <div className="App">
      <Router>
        <img className="main-background" src={backgroundImage} />
        <NavBarWrapper serverAddress={Config.serverAddress} />
        <Routes>
          <Route
            path="/"
            exact
            element={<LandingPage serverAddress={Config.serverAddress} />}
          />
          <Route
            path="/find-games-like"
            exact
            element={<BrowsePageWrapper serverAddress={Config.serverAddress} />}
          />
          <Route
            path="/game"
            element={
              <GameDetailPageWrapper serverAddress={Config.serverAddress} />
            }
          />
          <Route path="/about" exact element={<AboutPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
