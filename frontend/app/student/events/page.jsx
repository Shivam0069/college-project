"use client";

import { StudentLayout } from "@/components/layouts/StudentLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent } from "@/components/custom/Card";
import { useClub } from "@/lib/hooks/useClub";

export default function StudentEventsPage() {
  const { events } = useClub();

  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <ProtectedRoute requiredRole="student">
      <StudentLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-600 mt-2">Check out upcoming club events</p>
          </div>

          {sortedEvents.length > 0 ? (
            <div className="space-y-4">
              {sortedEvents.map((event) => (
                <Card
                  key={event.id}
                  hover
                  className="md:flex md:items-center md:gap-6"
                >
                  <div className="md:w-1/4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg inline-block">
                      <div className="text-3xl font-bold">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-sm uppercase tracking-wide">
                        {new Date(event.date).toLocaleString("default", {
                          month: "short",
                          year: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                  <CardContent className="md:w-3/4 mt-4 md:mt-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {event.title}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                        {event.category}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{event.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <span>🕐</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span>📍</span>
                        <span>{event.location}</span>
                      </div>
                      {/* <div className="flex items-center gap-2 text-gray-600">
                        <span>👥</span>
                        <span>{event.attendees} registered</span>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-500 text-lg">No events scheduled</p>
              </CardContent>
            </Card>
          )}
        </div>
      </StudentLayout>
    </ProtectedRoute>
  );
}
