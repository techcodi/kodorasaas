import ToggleDisplay from "../ui/ToggleDisplay";
import "./DashNav.css";
function DashNav({ openNav, setOpenNav }) {
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
        <ToggleDisplay />
      </div>
    </div>
  );
}

export default DashNav;
