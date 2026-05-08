import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui";

function DashboardLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-[240px_1fr]">
        <aside className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="mb-4 text-lg font-semibold">Workspace</h2>
          <div className="flex flex-col gap-2">
            <NavLink to="/dashboard">Overview</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            {user?.role === "admin" && (
              <>
                <NavLink to="/manage-events">Manage Events</NavLink>
                <NavLink to="/manage-categories">Manage Categories</NavLink>
                <NavLink to="/manage-users">Manage Users</NavLink>
              </>
            )}
          </div>
        </aside>
        <section>
          <header className="mb-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-600">
              Signed in as <span className="font-semibold text-slate-900">{user?.name}</span>
            </p>
            <div className="flex gap-2">
              <Link to="/events">
                <Button variant="secondary">Browse events</Button>
              </Link>
              <Button variant="danger" onClick={logout}>
                Logout
              </Button>
            </div>
          </header>
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default DashboardLayout;
