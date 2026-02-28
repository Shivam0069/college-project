"use client";

import { StudentLayout } from "@/components/layouts/StudentLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent, CardTitle } from "@/components/custom/Card";
import { useAuth } from "@/lib/hooks/useAuth";
import { useClub } from "@/lib/hooks/useClub";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { notices, materials, events, gallery } = useClub();

  return (
    <ProtectedRoute requiredRole="student">
      <StudentLayout>
        <div className="space-y-8">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg">
            <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}!</h1>
            <p className="text-blue-100">
              Year: {user?.year} • {user?.branch}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">
                  {notices.length}
                </div>
                <p className="text-gray-600 mt-2">Notices</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent>
                <div className="text-4xl font-bold text-green-600">
                  {materials.length}
                </div>
                <p className="text-gray-600 mt-2">Study Materials</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent>
                <div className="text-4xl font-bold text-purple-600">
                  {events.length}
                </div>
                <p className="text-gray-600 mt-2">Upcoming Events</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent>
                <div className="text-4xl font-bold text-orange-600">
                  {gallery.length}
                </div>
                <p className="text-gray-600 mt-2">Gallery Images</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Notices */}
          <Card>
            <CardTitle>Recent Notices</CardTitle>
            <CardContent className="mt-4">
              {notices.length > 0 ? (
                <div className="space-y-4">
                  {notices.slice(0, 3).map((notice) => (
                    <div
                      key={notice._id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900">
                          {notice.title}
                        </h4>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {notice.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {notice.content?.substring(0, 100)}...
                      </p>
                      <p className="text-xs text-gray-500">{new Date(notice.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No notices yet</p>
              )}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/student/notices"
              className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition"
            >
              <div className="text-2xl mb-2">📢</div>
              <h3 className="font-bold text-gray-900">View All Notices</h3>
              <p className="text-sm text-gray-600 mt-1">
                Stay updated with latest news
              </p>
            </a>
            <a
              href="/student/materials"
              className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition"
            >
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-bold text-gray-900">Study Materials</h3>
              <p className="text-sm text-gray-600 mt-1">
                Download learning resources
              </p>
            </a>
            <a
              href="/student/events"
              className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition"
            >
              <div className="text-2xl mb-2">🎉</div>
              <h3 className="font-bold text-gray-900">Upcoming Events</h3>
              <p className="text-sm text-gray-600 mt-1">
                Never miss our events
              </p>
            </a>
          </div>
        </div>
      </StudentLayout>
    </ProtectedRoute>
  );
}
