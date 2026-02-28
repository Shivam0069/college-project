"use client";

import { AdminLayout } from "@/components/layouts/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent, CardTitle } from "@/components/custom/Card";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "@/components/custom/Table";
import { useAuth } from "@/lib/hooks/useAuth";

export default function ApprovedStudentsPage() {
  const { approvedStudents } = useAuth();

  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Approved Students
            </h1>
            <p className="text-gray-600 mt-2">
              View all approved student members
            </p>
          </div>

          {approvedStudents.length > 0 ? (
            <Card>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Year</TableHeader>
                    <TableHeader>Branch</TableHeader>
                    <TableHeader>Approved Date</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {approvedStudents.map((student) => (
                    <TableRow key={student.id} hover>
                      <TableCell className="font-semibold">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>{student.branch}</TableCell>
                      <TableCell>{student.approvedAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-500 text-lg">
                  No approved students yet
                </p>
              </CardContent>
            </Card>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent>
                <div className="text-4xl font-bold text-green-600">
                  {approvedStudents.length}
                </div>
                <p className="text-gray-600 mt-2">Total Approved</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">
                  {new Set(approvedStudents.map((s) => s.department)).size}
                </div>
                <p className="text-gray-600 mt-2">Departments</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent>
                <div className="text-4xl font-bold text-purple-600">100%</div>
                <p className="text-gray-600 mt-2">Active</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
