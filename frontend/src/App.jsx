import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Footer from './components/footer/Footer';
import Ticket from './pages/ticket/Ticket';
import NotFound from './pages/notfound/NotFound';
import Contact from './pages/contact/Contact';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Terms from './pages/Terms/TermsOfService';
import Review from './pages/review/ReviewPage';
import FerrySelection from './pages/ticket/FerrySelection';
import PassengerDetails from './pages/ticket/PassengerDetails'
import Faq from './pages/faq/Faq';
import ForgotPassword from './pages/forgetpassword/ForgetPassword';
import OtpPage from './pages/forgetpassword/OtpPage';
function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/forgot-password" || location.pathname === "/otp"; // Hide for login & register pages

  return (
    <main className="w-full flex flex-col bg-neutral-50 min-h-screen">
      {/* Conditionally render Navbar */}
      {!hideLayout && <Navbar />}
      
      {/* Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/review" element={<Review />} />
        <Route path="/ferry-selection/:id" element={<FerrySelection />} />
        <Route path="/passenger-details" element={<PassengerDetails />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>

      {/* Conditionally render Footer */}
      {!hideLayout && <Footer />}
    </main>
  );
}

export default App;
