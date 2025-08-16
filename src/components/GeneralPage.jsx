import { useAuth } from "../context/AppContext";
import Form from "./Form";
import ResumeLoader from "../ui/ResumeLoader";
import "./GeneralPage.css";
function GeneralPage() {
  const { user } = useAuth();

  return (
    <div>
      <div className="overview">
        <h3>Welcome, {user?.user_metadata?.name || "Dev"} 👋</h3>
        <p>Here's what's happening with your development journey.</p>
      </div>

      <Form />
    </div>
  );
}

export default GeneralPage;
