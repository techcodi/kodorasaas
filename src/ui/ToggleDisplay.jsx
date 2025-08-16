import { useAuth } from "../context/AppContext";
import "./ToggleDisplay.css";

function ToggleDisplay() {
  const { isDarkMode, toggleTheme } = useAuth();

  return (
    <div>
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
  );
}

export default ToggleDisplay;
