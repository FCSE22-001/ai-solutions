import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navibar from './components/Navibar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Reviews from './pages/Reviews';
import PromotionalE from './pages/PromotionalE';
import UpcomingE from './pages/UpcomingE';
import ContactUs from './pages/ContactUs';
import Admin from './pages/Admin';
import TaskeroSuite from './pages/TaskeroSuite';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navibar/>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/promotionale" element={<PromotionalE />} />
            <Route path="/upcominge" element={<UpcomingE />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/solutions/taskero-suite" element={<TaskeroSuite />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
