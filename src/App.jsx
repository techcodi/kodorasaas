import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import WaitList from "./components/WaitList";
import AppContext from "./context/AppContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import GeneralPage from "./components/GeneralPage";
import Setting from "./components/Setting";
import Portfolio from "./components/Portfolio";
import Skill from "./components/Skill";
import LandingPage from "./pages/LandingPage";
import Error from "./components/Error";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext>
        <Router>
          <Routes>
            <Route path="*" element={<Error />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<GeneralPage />} />
              <Route path="general" element={<GeneralPage />} />
              <Route path="setting" element={<Setting />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="skill" element={<Skill />} />
            </Route>
          </Routes>

          <ToastContainer />
        </Router>
      </AppContext>
    </QueryClientProvider>
  );
}

export default App;
