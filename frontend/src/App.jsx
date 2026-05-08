import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import Dashboard from "./pages/Dashboard";
import EventDetails from "./pages/EventDetails";
import Events from "./pages/Events";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageCategories from "./pages/ManageCategories";
import ManageEvents from "./pages/ManageEvents";
import ManageUsers from "./pages/ManageUsers";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<RoleRoute role="admin" />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/manage-events" element={<RoleRoute role="admin" />}>
            <Route index element={<ManageEvents />} />
          </Route>
          <Route path="/manage-users" element={<RoleRoute role="admin" />}>
            <Route index element={<ManageUsers />} />
          </Route>
          <Route path="/manage-categories" element={<RoleRoute role="admin" />}>
            <Route index element={<ManageCategories />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;