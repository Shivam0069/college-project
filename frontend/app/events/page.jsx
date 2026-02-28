"use client";

import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Card, CardContent, CardTitle } from "@/components/custom/Card";
import { eventsData } from "@/lib/constants/dummyData";
import { useClub } from "../../lib/hooks/useClub";

export default function EventsPage() {
  // Sort events by date
  const { events } = useClub();
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <PublicLayout>
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Our Events</h1>
        <p className="text-xl text-gray-600 mb-12">
          Stay updated with our upcoming events and join us for exciting
          opportunities
        </p>

        <div className="space-y-6">
          {sortedEvents.map((event) => (
            <Card
              key={event.id}
              hover
              className="md:flex md:items-center md:gap-6"
            >
              <div className="md:w-1/3">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                  <div className="text-4xl font-bold">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-sm uppercase tracking-wide">
                    {new Date(event.date).toLocaleString("default", {
                      month: "short",
                    })}
                  </div>
                </div>
              </div>
              <CardContent className="md:w-2/3 mt-4 md:mt-0">
                <CardTitle>{event.title}</CardTitle>
                <p className="text-gray-700 mt-2">{event.description}</p>
                <div className="mt-4 space-y-2">
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

        {sortedEvents.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500">
                No events scheduled at the moment. Check back soon!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </PublicLayout>
  );
}
