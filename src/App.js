import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Header from "./Componants/Header";
import Home from "./Componants/Home";
import Coins from "./Componants/Coins";
import Exchanges from "./Componants/Exchanges";
import CoinDetails from "./Componants/CoinDetails";
import Footer from "./Componants/Footer";



function App() {
  return <Router>

<Header />
<Routes>
  <Route path="/" element = {<Home />} />
  <Route path="/coins" element = {<Coins />} />
  <Route path="/coins/:id" element = {<CoinDetails />} />
  <Route path="/exchanges" element = {<Exchanges />} />

</Routes>
<Footer />

  </Router>
}

export default App;
