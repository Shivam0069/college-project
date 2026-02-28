'use client';

import { AdminLayout } from '@/components/layouts/AdminLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardTitle } from '@/components/custom/Card';
import { useAuth } from '@/lib/hooks/useAuth';
import { useClub } from '@/lib/hooks/useClub';

export default function AdminDashboard() {
  const { user, pendingStudents, approvedStudents } = useAuth();
  const club = useClub();
  const summary = club.getClubSummary();

  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <div className="space-y-8">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-8 rounded-lg">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-green-100">Welcome back, {user?.name}!</p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="text-center">
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{approvedStudents.length}</div>
                <p className="text-gray-600 mt-2 text-sm">Approved Students</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">{pendingStudents.length}</div>
                <p className="text-gray-600 mt-2 text-sm">Pending Approvals</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{summary.totalNotices}</div>
                <p className="text-gray-600 mt-2 text-sm">Notices</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">{summary.totalMaterials}</div>
                <p className="text-gray-600 mt-2 text-sm">Materials</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{summary.totalEvents}</div>
                <p className="text-gray-600 mt-2 text-sm">Events</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/admin/students/pending" className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-bold text-gray-900">Approve Students</h3>
              <p className="text-sm text-gray-600 mt-1">{pendingStudents.length} pending</p>
            </a>
            <a href="/admin/notices" className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition">
              <div className="text-3xl mb-2">📢</div>
              <h3 className="font-bold text-gray-900">Manage Notices</h3>
              <p className="text-sm text-gray-600 mt-1">{summary.totalNotices} notices</p>
            </a>
            <a href="/admin/materials" className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition">
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-bold text-gray-900">Upload Materials</h3>
              <p className="text-sm text-gray-600 mt-1">{summary.totalMaterials} files</p>
            </a>
            <a href="/admin/events" className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition">
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="font-bold text-gray-900">Manage Events</h3>
              <p className="text-sm text-gray-600 mt-1">{summary.totalEvents} events</p>
            </a>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Students */}
            <Card>
              <CardTitle>Pending Student Approvals</CardTitle>
              <CardContent className="mt-4">
                {pendingStudents.length > 0 ? (
                  <div className="space-y-3">
                    {pendingStudents.slice(0, 5).map((student) => (
                      <div key={student.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="font-semibold text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-600">{student.email} • {student.roll}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No pending approvals</p>
                )}
              </CardContent>
            </Card>

            {/* Recent Notices */}
            <Card>
              <CardTitle>Recent Notices</CardTitle>
              <CardContent className="mt-4">
                {club.notices.length > 0 ? (
                  <div className="space-y-3">
                    {club.notices.slice(0, 5).map((notice) => (
                      <div key={notice.id} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="font-semibold text-gray-900 truncate">{notice.title}</p>
                        <p className="text-xs text-gray-600">{notice.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No notices yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
