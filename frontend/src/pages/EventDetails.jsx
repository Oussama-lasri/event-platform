import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Card } from "../components/ui";
import { eventService } from "../services/eventService";
import { getApiErrorMessage } from "../services/http";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setEvent(await eventService.getEventById(id));
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Failed to load event"));
      }
    };
    load();
  }, [id]);

  if (!event) return <p>Loading event...</p>;

  return (
    <Card className="overflow-hidden p-0">
      <img
        src={event.image || "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1400&auto=format&fit=crop"}
        alt={event.title}
        className="h-72 w-full object-cover"
      />
      <div className="p-6">
      <h1 className="text-3xl font-bold text-slate-900">{event.title}</h1>
      <p className="mt-2 text-slate-700">{event.description}</p>
      <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
        <p>Time: {event.time}</p>
        <p>Location: {event.location}</p>
        <p>Status: {event.status}</p>
        <p>Category: {event.categoryId?.name || "N/A"}</p>
        <p>Capacity: {event.maxParticipants}</p>
      </div>
      </div>
    </Card>
  );
}

export default EventDetails;
