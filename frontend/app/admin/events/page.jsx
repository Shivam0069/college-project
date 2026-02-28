"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent, CardTitle } from "@/components/custom/Card";
import { Input } from "@/components/custom/Input";
import { Textarea } from "@/components/custom/Textarea";
import { Select } from "@/components/custom/Select";
import { Button } from "@/components/custom/Button";
import { Modal } from "@/components/custom/Modal";
import { useClub } from "@/lib/hooks/useClub";

export default function AdminEventsPage() {
  const { events, addEvent, deleteEvent } = useClub();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "10:00 AM",
    location: "Main Campus",
    category: "Event",
  });

  const categories = [
    { value: "Event", label: "Event" },
    { value: "Workshop", label: "Workshop" },
    { value: "Lecture", label: "Lecture" },
    { value: "Competition", label: "Competition" },
    { value: "Meetup", label: "Meetup" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addEvent(formData);

    if (result.success) {
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "10:00 AM",
        location: "Main Campus",
        category: "Event",
      });
      setModalOpen(false);
    }
  };

  const handleDelete = (eventId) => {
    const result = deleteEvent(eventId);
    setDeleteMessage(result.message);
    setTimeout(() => setDeleteMessage(""), 3000);
  };

  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Manage Events
              </h1>
              <p className="text-gray-600 mt-2">
                Create and manage club events
              </p>
            </div>
            <Button onClick={() => setModalOpen(true)}>+ Create Event</Button>
          </div>

          {deleteMessage && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {deleteMessage}
            </div>
          )}

          {sortedEvents.length > 0 ? (
            <div className="space-y-4">
              {sortedEvents.map((event) => (
                <Card key={event.id} hover className="md:flex md:gap-6">
                  <div className="md:w-1/4">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-lg inline-block">
                      <div className="text-3xl font-bold">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-sm uppercase">
                        {new Date(event.date).toLocaleString("default", {
                          month: "short",
                        })}
                      </div>
                    </div>
                  </div>
                  <CardContent className="md:w-3/4 mt-4 md:mt-0 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-900">
                        {event.title}
                      </h3>
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                        {event.category}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{event.description}</p>
                    <div className="flex gap-4 text-sm text-gray-600 mb-3">
                      <span>🕐 {event.time}</span>
                      <span>📍 {event.location}</span>
                      {/* <span>👥 {event.attendees} registered</span> */}
                    </div>
                  </CardContent>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(event._id)}
                    className="mt-4 md:mt-0"
                  >
                    Delete
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-500 text-lg">
                  No events yet. Create one!
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Create Event Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Create New Event"
          size="lg"
          footer={
            <>
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Create Event</Button>
            </>
          }
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="title"
              label="Event Title"
              placeholder="e.g., Tech Workshop 2024"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <Textarea
              name="description"
              label="Description"
              placeholder="Event description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                name="date"
                label="Event Date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <Input
                type="time"
                name="time"
                label="Event Time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>

            <Input
              name="location"
              label="Location"
              placeholder="e.g., Main Hall"
              value={formData.location}
              onChange={handleChange}
            />

            <Select
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleChange}
              options={categories}
            />
          </form>
        </Modal>
      </AdminLayout>
    </ProtectedRoute>
  );
}
