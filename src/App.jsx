import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ScheduleInterview from "./pages/ScheduleInterview";
import Home from "./pages/Home";
import EditInterview from "./pages/EditInterview";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule" element={<ScheduleInterview />} />
          <Route path="/edit/:id" element={<EditInterview />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
