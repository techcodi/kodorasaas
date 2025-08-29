import ToggleDisplay from "../../ui/ToggleDisplay";
import "./Header.css";

const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <img src="./logo.png" alt="logo-image" className="logo" />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div className="desktop-nav">
              <a href="#" className="nav-link">
                Home
              </a>
              <a href="#feature" className="nav-link">
                Features
              </a>
              <a href="#how-it-work" className="nav-link">
                How it Works
              </a>
              <a href="#" className="nav-link">
                Pricing
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <ToggleDisplay />
              <button
                className="mobile-menu-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? "X" : <i className="fas fa-bars"></i>}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-nav">
              <a href="#" className="nav-link">
                Home
              </a>
              <a href="#feature" className="nav-link">
                Features
              </a>
              <a href="#how-it-work" className="nav-link">
                How it Works
              </a>
              <a href="#" className="nav-link">
                Pricing
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
