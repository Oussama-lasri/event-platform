import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Card, Input, Select } from "../components/ui";
import { categoryService } from "../services/categoryService";
import { eventService } from "../services/eventService";
import { getApiErrorMessage } from "../services/http";
import { uploadService } from "../services/uploadService";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const load = async () => {
    const [eventsData, categoriesData] = await Promise.all([eventService.getEvents(), categoryService.getCategories()]);
    setEvents(eventsData);
    setCategories(categoriesData);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load().catch((error) => toast.error(getApiErrorMessage(error, "Failed to load events")));
  }, []);

  const onSubmit = async (values) => {
    try {
      let imageUrl = values.image;
      if (selectedImage) {
        const uploaded = await uploadService.uploadEventImage(selectedImage);
        imageUrl = uploaded.imageUrl;
      }
      const payload = { ...values, image: imageUrl };
      if (editingId) {
        await eventService.updateEvent(editingId, payload);
        toast.success("Event updated");
      } else {
        await eventService.createEvent(payload);
        toast.success("Event created");
      }
      reset();
      setEditingId(null);
      setSelectedImage(null);
      setImagePreview("");
      await load();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to save event"));
    }
  };

  const onEdit = (event) => {
    setEditingId(event._id);
    reset({
      title: event.title,
      description: event.description,
      date: event.date?.split("T")[0],
      time: event.time,
      location: event.location,
      maxParticipants: event.maxParticipants,
      status: event.status,
      categoryId: event.categoryId?._id || event.categoryId || "",
      image: event.image || "",
    });
    setImagePreview(event.image || "");
    setSelectedImage(null);
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await eventService.deleteEvent(id);
      toast.success("Event deleted");
      await load();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Delete failed"));
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="mb-3 text-xl font-semibold text-slate-900">{editingId ? "Update Event" : "Create Event"}</h1>
        <form className="grid gap-3 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Title" {...register("title")} />
          <Input type="date" {...register("date")} />
          <Input placeholder="Time" {...register("time")} />
          <Input placeholder="Location" {...register("location")} />
          <Input placeholder="Max participants" type="number" {...register("maxParticipants")} />
          <Select {...register("status")}>
            <option value="upcoming">upcoming</option>
            <option value="ongoing">ongoing</option>
            <option value="finished">finished</option>
            <option value="cancelled">cancelled</option>
          </Select>
          <Select {...register("categoryId")}>
            <option value="">No category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Select>
          <Input placeholder="Image URL" {...register("image")} />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) {
                setSelectedImage(null);
                return;
              }
              setSelectedImage(file);
              setImagePreview(URL.createObjectURL(file));
            }}
          />
          {(imagePreview || selectedImage) && (
            <div className="md:col-span-2 overflow-hidden rounded-xl border border-slate-200">
              <img
                src={imagePreview}
                alt="Event preview"
                className="h-48 w-full object-cover"
              />
            </div>
          )}
          <textarea className="md:col-span-2 rounded-lg border border-slate-300 p-2" rows={4} placeholder="Description" {...register("description")} />
          <div className="md:col-span-2 flex gap-2">
            <Button type="submit">{editingId ? "Update" : "Create"}</Button>
            {editingId && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setEditingId(null);
                  reset();
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Event management table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="p-2">Title</th>
                <th className="p-2">Category</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="border-b border-slate-100">
                  <td className="p-2">{event.title}</td>
                  <td className="p-2">{event.categoryId?.name || "—"}</td>
                  <td className="p-2">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="p-2">{event.status}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => onEdit(event)}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => onDelete(event._id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default ManageEvents;
