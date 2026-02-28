"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent, CardTitle } from "@/components/custom/Card";
import { Button } from "@/components/custom/Button";
import { Modal } from "@/components/custom/Modal";
import { useAuth } from "@/lib/hooks/useAuth";

export default function PendingStudentsPage() {
  const { pendingStudents, approveStudent, rejectStudent } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [actionMessage, setActionMessage] = useState("");
  console.log("Pending students:", pendingStudents);

  const handleApprove = (studentId) => {
    const result = approveStudent(studentId);
    setActionMessage(result.message);
    setTimeout(() => {
      setActionMessage("");
      setSelectedStudent(null);
    }, 2000);
  };

  const handleReject = (studentId) => {
    const result = rejectStudent(studentId);
    setActionMessage(result.message);
    setTimeout(() => {
      setActionMessage("");
      setSelectedStudent(null);
    }, 2000);
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Pending Student Approvals
            </h1>
            <p className="text-gray-600 mt-2">
              Review and approve new student registrations
            </p>
          </div>

          {actionMessage && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {actionMessage}
            </div>
          )}

          {pendingStudents.length > 0 ? (
            <div className="space-y-4">
              {pendingStudents.map((student) => (
                <Card key={student._id} hover>
                  <div className="md:flex md:justify-between md:items-center">
                    <CardContent>
                      <h3 className="font-bold text-lg text-gray-900">
                        {student.name}
                      </h3>
                      <p className="text-gray-600">{student.email}</p>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-semibold">Year:</span>{" "}
                          {student.year}
                        </div>
                        <div>
                          <span className="font-semibold">Branch:</span>{" "}
                          {student.branch}
                        </div>
                        <div>
                          <span className="font-semibold">Registered:</span>{" "}
                          {student.registeredAt}
                        </div>
                      </div>
                    </CardContent>
                    <div className="mt-4 md:mt-0 flex gap-2">
                      <Button
                        variant="success"
                        onClick={() => handleApprove(student._id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleReject(student._id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-500 text-lg">
                  No pending approvals at the moment
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Modal for student details */}
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title="Student Details"
          footer={
            <>
              <Button
                variant="outline"
                onClick={() => setSelectedStudent(null)}
              >
                Cancel
              </Button>
              <Button onClick={() => handleApprove(selectedStudent?.id)}>
                Approve
              </Button>
              <Button
                variant="danger"
                onClick={() => handleReject(selectedStudent?.id)}
              >
                Reject
              </Button>
            </>
          }
        >
          {selectedStudent && (
            <div className="space-y-4">
              <div>
                <label className="font-semibold text-gray-700">Name</label>
                <p className="text-gray-900">{selectedStudent.name}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Email</label>
                <p className="text-gray-900">{selectedStudent.email}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">
                  Roll Number
                </label>
                <p className="text-gray-900">{selectedStudent.roll}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">
                  Department
                </label>
                <p className="text-gray-900">{selectedStudent.department}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">
                  Registered Date
                </label>
                <p className="text-gray-900">{selectedStudent.registeredAt}</p>
              </div>
            </div>
          )}
        </Modal>
      </AdminLayout>
    </ProtectedRoute>
  );
}
