import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import WaitList from "./components/WaitList";
import AppContext from "./context/AppContext";

function App() {
  return (
    <Router>
      <AppContext>
        <Routes>
          <Route path="/" element={<WaitList />} />
        </Routes>
      </AppContext>
      <ToastContainer />
    </Router>
  );
}

export default App;
