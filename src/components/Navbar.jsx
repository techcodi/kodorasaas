import ToggleDisplay from "../ui/ToggleDisplay";
import "./nav.css";
function Navbar() {
  return (
    <nav>
      <div className="nav-container">
        <img src="/logo.png" alt="logo" />
        <ToggleDisplay />
      </div>
    </nav>
  );
}

export default Navbar;
