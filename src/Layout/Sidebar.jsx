import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ setOpenNav, openNav }) {
  return (
    <div className="sidebar">
      <button
        className="menu-btn"
        aria-label="Toggle Navigation"
        onClick={() => setOpenNav(!openNav)}
      >
        <i className={`fa-solid fa-${openNav ? "xmark" : "bars"}`}></i>
      </button>

      <img src="/logo.png" alt="logo" />
      <div>
        <Link to="general">
          <i className="fa-regular fa-circle"></i> <span> Overview</span>
        </Link>
        <Link to="skill">
          <i className="fa-regular fa-lightbulb"></i> <span> Skills</span>
        </Link>
        <Link to="portfolio">
          <i className="fa-regular fa-file"></i> <span>Resume</span>
        </Link>
        <Link to="setting">
          <i className="fa-regular fa-circle-user"></i> <span> Setting </span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
