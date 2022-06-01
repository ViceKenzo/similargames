import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.js";
import AboutPage from "./pages/AboutPage.js";
import ErrorPage from "./pages/ErrorPage.js";
import NavBarWrapper from "./components/NavBarWrapper.js";
import Footer from "./components/Footer.js";
import backgroundImage from "./images/main_background.svg";
import Config from "./config/config.js";
import BrowsePage from "./pages/BrowsePage.js";
import GameDetailPage from "./pages/GameDetailPage.js";

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
            element={<BrowsePage serverAddress={Config.serverAddress} />}
          />
          <Route
            path="/game"
            element={<GameDetailPage serverAddress={Config.serverAddress} />}
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
