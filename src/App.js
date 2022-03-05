import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import BrowsePageWrapper from "./pages/BrowsePageWrapper";
import GameDetailPageWrapper from "./pages/GameDetailPageWrapper.jsx";
import backgroundImage from "./images/main_background.svg";

function App() {
  return (
    <div className="App">
      <Router>
        <img className="main-background" src={backgroundImage} />
        <NavBar />
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/Search" exact element={<BrowsePageWrapper />} />
          <Route path="/Game" element={<GameDetailPageWrapper />} />
          <Route path="/About" exact element={<AboutPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
