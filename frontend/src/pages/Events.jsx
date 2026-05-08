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
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Discover Amazing <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Events</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Find and register for the best events in your area. From conferences to workshops, we've got you covered.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="flex items-center text-slate-500">
              <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {events.length} Events Available
            </div>
            <div className="flex items-center text-slate-500">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Easy Registration
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card-modern p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Filter Events</h2>
          <Button
            variant="secondary"
            onClick={() => setFilters({ search: "", category: "", status: "", date: "" })}
            className="text-sm"
          >
            Clear Filters
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Search Events</label>
            <Input
              placeholder="Search by title..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <Select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
            <Input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      {!events.length && (
        <div className="text-center py-16">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 mx-auto mb-6">
            <svg className="h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No events found</h3>
          <p className="text-slate-600 max-w-md mx-auto">
            Try adjusting your filters or check back later for new events.
          </p>
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

export default Events;
