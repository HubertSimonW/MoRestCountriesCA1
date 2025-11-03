import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Country from "./pages/Country.jsx";
import Region from "./pages/Region.jsx";

export default function App() {
  const location = useLocation();

  return (
    // Wrap with base bg colour
    <div className="min-h-screen bg-base-200">
      <Navbar />
          {/* Main Content */}
      <main className="container mx-auto p-4">
          {/* Framer motion handles the route transitions */}
        <AnimatePresence mode="wait"> 
          {/* Wraps routes fades pages */}
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >        
            <Routes location={location} key={location.pathname}> 
              <Route path="/" element={<Home />} />
              <Route path="/country/:code" element={<Country />} />
              <Route path="/region/:region" element={<Region />} />
              <Route
                path="*"
                element={
                  <div>
                    Not found.{" "}
                    <Link className="link" to="/">
                      Go Home
                    </Link>
                  </div>
                }
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
