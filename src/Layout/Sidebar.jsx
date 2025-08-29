import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";
import supabase from "../services/supabase";
import "./Sidebar.css";

function Sidebar({ setOpenNav, openNav }) {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };
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
      <div className="dash-links">
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

      <span
        onClick={signOut}
        style={{
          fontWeight: "500",
          cursor: "pointer",
          color: "#fff",
          bottom: "10px",
          position: "fixed",
          fontSize: "1.3rem",
        }}
      >
        <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
      </span>
    </div>
  );
}

export default Sidebar;
