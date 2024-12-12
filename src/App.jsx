import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Acceuil from "./pages/acceuil";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./pages/Services";

const App = () => (
  <div className="flex flex-col min-h-screen">
    <Router>
    <ScrollToTop />
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Acceuil />} />

          <Route path="/services" element={<Services />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  </div>
);

export default App;
