import { Outlet } from "react-router-dom";
// import { useAuth } from "../context/AppContext";
import "./MainApp.css";
function MainApp() {
  //   const { user } = useAuth();
  return (
    <div className="main-outlet">
      <Outlet />
    </div>
  );
}

export default MainApp;
