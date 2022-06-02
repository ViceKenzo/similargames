import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import LandingPage from "./pages/LandingPage.js";
import AboutPage from "./pages/AboutPage.js";
import ErrorPage from "./pages/ErrorPage.js";
import ConnectionErrorPage from "./pages/ConnectionErrorPage.js";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer.js";
import Config from "./config/config.js";
import BrowsePage from "./pages/BrowsePage.js";
import GameDetailPage from "./pages/GameDetailPage.js";

import backgroundImage from "./images/main_background.svg";

function App() {
  // Functions
  return (
    <div className="App">
      <Router>
        <img className="main-background" src={backgroundImage} />
        <NavBar serverAddress={Config.serverAddress} />
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
          <Route
            path="/connection-error"
            exact
            element={<ConnectionErrorPage />}
          />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
