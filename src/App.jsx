import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Acceuil from "./pages/acceuil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InfoSection from "./components/InfoSection";
import ServicesSection from "./components/ServicesSection";

const App = () => (
    <div className="flex flex-col min-h-screen">
        <Router>
            <Navbar />

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Acceuil />} />
                </Routes>
            </main>
            <InfoSection />
            <ServicesSection />
            <Footer />
        </Router>
    </div>
);

export default App;
