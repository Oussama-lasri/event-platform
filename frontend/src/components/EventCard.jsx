import { Link } from "react-router-dom";
import { Card, Button } from "./ui";

function EventCard({ event, onRegister, onCancelRegistration, isRegistered }) {
  return (
    <Card className="group flex h-full flex-col gap-3 overflow-hidden p-0">
      <div className="relative h-40 overflow-hidden bg-slate-100">
        <img
          src={event.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop"}
          alt={event.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium uppercase tracking-wide text-slate-700">
          {event.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
        <p className="text-sm text-slate-500">{event.categoryId?.name || "No category"}</p>
        <p className="line-clamp-2 text-sm text-slate-600">{event.description}</p>
      </div>
      <div className="mt-auto flex gap-2">
        <Link to={`/events/${event._id}`} className="flex-1">
          <Button className="w-full" variant="secondary">
            Details
          </Button>
        </Link>
        {onRegister &&
          (isRegistered ? (
            <Button className="flex-1" variant="danger" onClick={() => onCancelRegistration(event._id)}>
              Cancel Registration
            </Button>
          ) : (
            <Button className="flex-1" onClick={() => onRegister(event._id)}>
              Register
            </Button>
          ))}
      </div>
    </Card>
  );
}

export default EventCard;
