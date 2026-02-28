"use client";

import { StudentLayout } from "@/components/layouts/StudentLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent, CardTitle } from "@/components/custom/Card";
import { useClub } from "@/lib/hooks/useClub";

export default function StudentNoticesPage() {
  const { notices } = useClub();

  return (
    <ProtectedRoute requiredRole="student">
      <StudentLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Notices</h1>
            <p className="text-gray-600 mt-2">
              Stay updated with the latest announcements
            </p>
          </div>

          {notices.length > 0 ? (
            <div className="space-y-4">
              {notices.map((notice) => (
                <Card key={notice._id} hover>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {notice.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(notice.createdAt).toLocaleDateString()} • By
                        Admin
                      </p>
                    </div>
                    <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
                      {notice.category || "General"}
                    </span>
                  </div>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {notice.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-500 text-lg">
                  No notices yet. Check back later!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </StudentLayout>
    </ProtectedRoute>
  );
}
