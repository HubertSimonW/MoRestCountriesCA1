import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

// Tab component for all 3 regions (Eu,Asia,Americas)
const Tab = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
  >
    {children}
  </NavLink>
);

export default function Navbar() {
  const [theme, setTheme] = useState(        
    () => localStorage.getItem("theme") || "hubert"  // Light theme or custom hubert
  );

  // If theme changes, applies and saves
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    // Countries with shadow effect (top left)
    <div className="navbar bg-base-100 shadow sticky top-0 z-50"> 
      <div className="container mx-auto">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl">
             Countries
          </Link>
        </div>

        <div className="navbar-center">
          <div className="tabs tabs-bordered">
            <Tab to="/region/Europe">Europe</Tab>
            <Tab to="/region/Asia">Asia</Tab>
            <Tab to="/region/Americas">Americas</Tab>
          </div>
        </div>

        {/* theme toggler (custom or light) */}
        <div className="navbar-end">
          <label className="swap swap-rotate">
            <input
              aria-label="Toggle theme"
              type="checkbox"
              checked={theme === "light"}
              onChange={() =>
                setTheme((t) => (t === "hubert" ? "light" : "hubert"))
              }
            />
            {/* shows the moon when unchecked (hubert) */}
            <svg
              className="swap-off fill-current w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64 13.64A9 9 0 1110.36 2.36 7 7 0 0021.64 13.64z" />
            </svg>
            {/* show the sun when checked (light) */}
            <svg
              className="swap-on fill-current w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64 17.657l-1.414 1.414 2.121 2.121 1.414-1.414-2.121-2.121zm12.728 0l-2.121 2.121 1.414 1.414 2.121-2.121-1.414-1.414zM12 4V1h0v3h0zm0 19v-3h0v3h0zm8-8h3v0h-3v0zM1 12h3v0H1v0zm15.364-6.364l2.121-2.121 1.414 1.414-2.121 2.121-1.414-1.414zM5.64 5.636L4.225 4.222 2.11 6.343l1.415 1.414L5.64 5.636zM12 7a5 5 0 100 10 5 5 0 000-10z" />
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
}
