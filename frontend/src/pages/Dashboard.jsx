import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card } from "../components/ui";
import { dashboardService } from "../services/dashboardService";
import { eventService } from "../services/eventService";
import { getApiErrorMessage } from "../services/http";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsData, events] = await Promise.all([dashboardService.getStats(), eventService.getEvents()]);
        setStats(statsData);
        setRecentEvents(events.slice(0, 5));
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Failed to load dashboard"));
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-500">Users</p>
          <p className="text-2xl font-bold">{stats?.totalUsers ?? "-"}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Events</p>
          <p className="text-2xl font-bold">{stats?.totalEvents ?? "-"}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Registrations</p>
          <p className="text-2xl font-bold">{stats?.totalRegistrations ?? "-"}</p>
        </Card>
      </div>
      <Card>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Recent events</h2>
        <div className="space-y-2">
          {recentEvents.map((event) => (
            <div key={event._id} className="rounded-lg border border-slate-200 p-3">
              <p className="font-medium text-slate-900">{event.title}</p>
              <p className="text-sm text-slate-600">{new Date(event.date).toLocaleDateString()}</p>
            </div>
          ))}
          {!recentEvents.length && <p className="text-sm text-slate-500">No events yet.</p>}
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
