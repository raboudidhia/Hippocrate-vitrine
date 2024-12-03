import Navbar from "./components/Navbar";
import Acceuil from "./pages/acceuil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Acceuil />} />
    </Routes>
  </Router>
);

export default App;
