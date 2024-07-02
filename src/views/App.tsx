import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./LandingPage";
import Dashboard from "./main/Dashboard";
import Deposits from "./main/Deposits";
import Emissions from "./main/Emissions";
import MoneyApps from "./main/MoneyApps";

import Gallery from "./marketPlace/Gallery";

import MainGridContainer from "components/containers/MainGridContainer";

import "assets/scss/App.scss";
import "assets/scss/Content.scss";

function App() {

  return (
    <Router>
      <MainGridContainer>
        <Routes>
          {/* <Route path='/' element={<ComingSoon />} /> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deposits" element={<Deposits />} />
          <Route path="/emissions" element={<Emissions />} />
          <Route path="/moneyapps" element={<MoneyApps />} />
          <Route path="/nft/gallery" element={<Gallery />} />
        </Routes>
      </MainGridContainer>
    </Router>
  );
}

export default App;
