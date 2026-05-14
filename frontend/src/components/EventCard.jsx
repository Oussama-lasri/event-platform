import { Link } from "react-router-dom";
import { Card, Button } from "./ui";

function EventCard({ event, onRegister, onCancelRegistration, isRegistered }) {
  const getStatusClass = (status) => {
    const classes = {
      upcoming: "status-upcoming",
      ongoing: "status-ongoing",
      finished: "status-finished",
      cancelled: "status-cancelled"
    };
    return classes[status] || "status-upcoming";
  };

  const handleCancelRegistration = () => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel your registration for "${event.title}"?\n\nThis action cannot be undone.`
    );
    if (confirmed) {
      onCancelRegistration(event._id);
    }
  };

  return (
    <Card className="group flex h-full flex-col gap-3 overflow-hidden p-0 hover:shadow-glow transition-all duration-300">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
        <img
          src={event.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop"}
          alt={event.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <span className={`absolute left-4 top-4 status-badge ${getStatusClass(event.status)}`}>
          {event.status}
        </span>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">{event.title}</h3>
          <p className="text-white/90 text-sm drop-shadow">{event.categoryId?.name || "No category"}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-slate-500">
            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(event.date).toLocaleDateString()} at {event.time}
          </div>
          <div className="flex items-center text-sm text-slate-500">
            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>
          <div className="flex items-center text-sm text-slate-500">
            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            Max {event.maxParticipants} participants
          </div>
        </div>

        <p className="line-clamp-3 text-sm text-slate-600 leading-relaxed">{event.description}</p>
      </div>

      <div className="mt-auto flex gap-3 p-6 pt-0">
        <Link to={`/events/${event._id}`} className="flex-1">
          <Button className="w-full btn-secondary-modern h-14" variant="secondary">
            <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </Button>
        </Link>
        {onRegister &&
          (isRegistered ? (
            <Button className="flex-1 btn-danger-modern  h-14" variant="danger" onClick={handleCancelRegistration}>
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel Registration
            </Button>
          ) : (
            <Button className="flex-1 btn-primary-modern h-14" onClick={() => onRegister(event._id)}>
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Register
            </Button>
          ))}
      </div>
    </Card>
  );
}

export default EventCard;
