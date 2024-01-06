import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className=" font-serif">
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/" element={<Dashboard />} />
        </Route>

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
