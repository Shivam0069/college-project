"use client";

import { StudentLayout } from "@/components/layouts/StudentLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent, CardTitle } from "@/components/custom/Card";
import { Button } from "@/components/custom/Button";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function StudentProfilePage() {
  const { user, logoutUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  return (
    <ProtectedRoute requiredRole="student">
      <StudentLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-2">
              Manage your account information
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-2">
              <CardTitle>Personal Information</CardTitle>
              <CardContent className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <p className="text-lg text-gray-900">{user?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <p className="text-lg text-gray-900">{user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Roll Number
                    </label>
                    <p className="text-lg text-gray-900">{user?.year}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <p className="text-lg text-gray-900">{user?.branch}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Account Status
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Active Member</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardTitle>Account</CardTitle>
              <CardContent className="mt-6 space-y-3">
                <Button variant="outline" className="w-full text-left">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full text-left">
                  Update Email
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

          {/* Member Stats */}
          <Card>
            <CardTitle>Member Statistics</CardTitle>
            <CardContent className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">5</div>
                  <p className="text-sm text-gray-600">Events Attended</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <p className="text-sm text-gray-600">Materials Downloaded</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">8</div>
                  <p className="text-sm text-gray-600">Months Member</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">25</div>
                  <p className="text-sm text-gray-600">Activity Points</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </StudentLayout>
    </ProtectedRoute>
  );
}
