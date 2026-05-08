import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import EventCard from "../components/EventCard";
import Pagination from "../components/Pagination";
import { Button, Card, Input, Select } from "../components/ui";
import { useAuth } from "../hooks/useAuth";
import { usePagination } from "../hooks/usePagination";
import { categoryService } from "../services/categoryService";
import { eventService } from "../services/eventService";
import { registrationService } from "../services/registrationService";
import { getApiErrorMessage } from "../services/http";

function Events() {
  const { isAuthenticated, user } = useAuth();
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ search: "", category: "", status: "", date: "" });
  const [registrationMap, setRegistrationMap] = useState({});

  useEffect(() => {
    if (!user?._id) return;
    const storageKey = `registrations:${user._id}`;
    const persistedMap = localStorage.getItem(storageKey);
    if (persistedMap) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRegistrationMap(JSON.parse(persistedMap));
    } else {
      setRegistrationMap({});
    }
  }, [user?._id]);

  const persistRegistrationMap = (nextMap) => {
    if (!user?._id) return;
    localStorage.setItem(`registrations:${user._id}`, JSON.stringify(nextMap));
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [eventsData, categoriesData] = await Promise.all([eventService.getEvents(filters), categoryService.getCategories()]);
        setEvents(eventsData);
        setCategories(categoriesData);
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Failed to load events"));
      }
    };
    load();
  }, [filters]);

  const { currentPage, setCurrentPage, totalPages, paginatedItems } = usePagination(events, 6);

  useEffect(() => {
    setCurrentPage(1);
  }, [events.length, setCurrentPage]);

  const handleRegister = async (eventId) => {
    try {
      const registration = await registrationService.registerToEvent(eventId);
      const nextMap = {
        ...registrationMap,
        [eventId]: registration._id,
      };
      setRegistrationMap(nextMap);
      persistRegistrationMap(nextMap);
      toast.success("Registered successfully");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Cannot register to event"));
    }
  };

  const handleCancelRegistration = async (eventId) => {
    const registrationId = registrationMap[eventId];
    if (!registrationId) {
      toast.error("Unknown registration id. Re-register first.");
      return;
    }
    try {
      await registrationService.cancelRegistration(registrationId);
      const nextMap = { ...registrationMap };
      delete nextMap[eventId];
      setRegistrationMap(nextMap);
      persistRegistrationMap(nextMap);
      toast.success("Registration cancelled");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Cannot cancel registration"));
    }
  };

  const statusOptions = useMemo(() => ["upcoming", "ongoing", "finished", "cancelled"], []);

  return (
    <div className="space-y-5">
      <section className="rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-900 p-8 text-white">
        <p className="text-xs uppercase tracking-widest text-indigo-200">Discover</p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">Find remarkable events near you</h1>
        <p className="mt-2 max-w-2xl text-sm text-indigo-100">Curated experiences with fast filtering, elegant cards, and frictionless registration.</p>
      </section>
      <Card className="mb-1">
        <div className="grid gap-3 md:grid-cols-5">
          <Input placeholder="Search title..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
          <Select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Select>
          <Select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            <option value="">All statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
          <Input type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
          <Button variant="secondary" onClick={() => setFilters({ search: "", category: "", status: "", date: "" })}>
            Clear
          </Button>
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedItems.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onRegister={isAuthenticated ? handleRegister : null}
            onCancelRegistration={isAuthenticated ? handleCancelRegistration : null}
            isRegistered={Boolean(registrationMap[event._id])}
          />
        ))}
      </div>
      {!events.length && <p className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">No events found.</p>}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

export default Events;
