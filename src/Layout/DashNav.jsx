import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";
import supabase from "../services/supabase";
import ToggleDisplay from "../ui/ToggleDisplay";
import "./DashNav.css";
function DashNav({ openNav, setOpenNav }) {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };
  return (
    <div className="topbar">
      <div className="logo" style={{ display: "flex", alignItems: "center" }}>
        <button className="menu-btn" onClick={() => setOpenNav(!openNav)}>
          <i className={`fa-solid fa-${openNav ? "xmark" : "bars"}`}></i>
        </button>
        <span className="logo-text">
          {" "}
          <img
            src="/logo.png"
            alt="Logo"
            width={100}
            style={{ marginBottom: "10px" }}
          />
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span
          onClick={signOut}
          style={{ fontWeight: "600", cursor: "pointer" }}
        >
          <i class="fa-solid fa-arrow-right-from-bracket"></i>Logout
        </span>
        <ToggleDisplay />
      </div>
    </div>
  );
}

export default DashNav;
