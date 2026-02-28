'use client';

import { AdminLayout } from '@/components/layouts/AdminLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardTitle } from '@/components/custom/Card';
import { Button } from '@/components/custom/Button';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function AdminProfilePage() {
  const { user, logoutUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push('/');
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Profile</h1>
            <p className="text-gray-600 mt-2">Manage your admin account</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Information */}
            <Card className="lg:col-span-2">
              <CardTitle>Account Information</CardTitle>
              <CardContent className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <p className="text-lg text-gray-900 font-semibold">{user?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <p className="text-lg text-gray-900">{user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <p className="text-lg text-gray-900">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                        Administrator
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <p className="text-lg text-gray-900">
                      <span className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        Active
                      </span>
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Admin Permissions</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Approve/Reject Students
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Create & Delete Notices
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Upload Study Materials
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Manage Events
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Manage Gallery
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardTitle>Actions</CardTitle>
              <CardContent className="mt-6 space-y-3">
                <Button variant="outline" className="w-full text-left">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full text-left">
                  Security Settings
                </Button>
                <Button variant="outline" className="w-full text-left">
                  Preferences
                </Button>
                <Button
                  variant="danger"
                  className="w-full mt-4"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Activity Log */}
          <Card>
            <CardTitle>Admin Statistics</CardTitle>
            <CardContent className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <p className="text-sm text-gray-600">Admin Actions Today</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">15</div>
                  <p className="text-sm text-gray-600">Students Approved</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">8</div>
                  <p className="text-sm text-gray-600">Notices Created</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">34</div>
                  <p className="text-sm text-gray-600">Total Items Managed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
