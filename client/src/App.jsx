import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Acceuil from "./pages/acceuil";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./pages/Services";
import Reservation from "./pages/Reservation";
import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';

const App = () => (
  <div className="flex flex-col min-h-screen">
    <Router>
      <AdminAuthProvider>
        <ScrollToTop />
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Acceuil />} />
            <Route path="/services" element={<Services />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </AdminAuthProvider>
    </Router>
  </div>
);

export default App;
