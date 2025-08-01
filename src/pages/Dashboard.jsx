import { useEffect, useState } from "react";
import { useAuth } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import DashNav from "../Layout/DashNav";
import MainApp from "../Layout/MainApp";
import Sidebar from "../Layout/Sidebar";
import Loader from "../components/Loader";
import "./Dashboard.css";

function Dashboard() {
  const { user, loading } = useAuth();
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) return <Loader />;

  return (
    <div className="dashboard-container">
      {openNav && <Sidebar openNav={openNav} setOpenNav={setOpenNav} />}

      <main className="main-content">
        <DashNav openNav={openNav} setOpenNav={setOpenNav} />

        <MainApp />
      </main>
    </div>
  );
}

export default Dashboard;
