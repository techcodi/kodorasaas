import { useAuth } from "../context/AppContext";
import "./nav.css";
function Navbar() {
  const { isDarkMode, toggleTheme } = useAuth();

  return (
    <nav>
      <div className="nav-container">
        <img src="/logo.png" alt="logo" />
        <div>
          <button
            className={`theme-toggle ${isDarkMode ? "dark" : "light"}`}
            onClick={toggleTheme}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <span className="toggle-thumb" />
            <span className="sun-icon">☀️</span>
            <span className="moon-icon">🌙</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
