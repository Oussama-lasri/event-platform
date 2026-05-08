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

  const statCards = [
    {
      title: "Total Events",
      value: stats?.totalEvents ?? "-",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Total Users",
      value: stats?.totalUsers ?? "-",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Total Registrations",
      value: stats?.totalRegistrations ?? "-",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {statCards.map((stat, index) => (
          <Card key={index} className="group relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Events */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Recent Events</h2>
            <p className="text-slate-600 mt-1">Latest events in your platform</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
            <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          {recentEvents.map((event) => (
            <div key={event._id} className="group flex items-center space-x-4 rounded-xl border border-slate-200 bg-gradient-to-r from-white to-slate-50/50 p-4 transition-all duration-200 hover:shadow-soft hover:border-indigo-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {event.title}
                </p>
                <p className="text-sm text-slate-600">
                  {new Date(event.date).toLocaleDateString()} • {event.location}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`status-badge ${event.status === 'upcoming' ? 'status-upcoming' : event.status === 'ongoing' ? 'status-ongoing' : event.status === 'finished' ? 'status-finished' : 'status-cancelled'}`}>
                  {event.status}
                </span>
                <svg className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
          {!recentEvents.length && (
            <div className="text-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mx-auto mb-4">
                <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-slate-500 font-medium">No events yet</p>
              <p className="text-slate-400 text-sm mt-1">Create your first event to get started</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
