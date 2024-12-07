import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Acceuil from "./pages/acceuil";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import NosTarifs from "./pages/NosTarifs";


const App = () => (
    <div className="flex flex-col min-h-screen">
        <Router>
            <Navbar />

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Acceuil />} />
                    <Route path="/tarifs" element={<NosTarifs />} />
                    <Route path="/Contact" element={<Contact />} />
                </Routes>
            </main>

            <Footer />
        </Router>
    </div>
);

export default App;
