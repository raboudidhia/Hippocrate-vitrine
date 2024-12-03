import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import Footer component
import Acceuil from "./pages/acceuil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => (
  <div className="flex flex-col min-h-screen">
    <Router>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Acceuil />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  </div>
);

export default App;
