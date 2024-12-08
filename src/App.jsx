import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Acceuil from "./pages/acceuil";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import NosTarifs from "./pages/NosTarifs";
import Services from "./pages/Services";


const App = () => (
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden">
        <Router>
            <Navbar />

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Acceuil />} />
                    <Route path="/tarifs" element={<NosTarifs />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/Contact" element={<Contact />} />
                </Routes>
            </main>

            <Footer />
        </Router>
    </div>
);

export default App;
