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
import { useAuth } from "@/lib/hooks/useAuth";

export default function AdminNoticesPage() {
  const { notices, addNotice, removeNotice } = useClub();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
  });

  const categories = [
    { value: "General", label: "General" },
    { value: "Event", label: "Event" },
    { value: "Opportunity", label: "Opportunity" },
    { value: "Study", label: "Study" },
    { value: "Announcement", label: "Announcement" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = addNotice({
      ...formData,
      author: user?.name,
    });

    if (result.success) {
      setFormData({ title: "", content: "", category: "General" });
      setModalOpen(false);
    }
  };

  const handleDelete = (noticeId) => {
    const result = removeNotice(noticeId);
    setDeleteMessage(result.message);
    setTimeout(() => setDeleteMessage(""), 3000);
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Manage Notices
              </h1>
              <p className="text-gray-600 mt-2">
                Create and manage club notices
              </p>
            </div>
            <Button onClick={() => setModalOpen(true)}>+ Add Notice</Button>
          </div>

          {deleteMessage && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {deleteMessage}
            </div>
          )}

          {notices.length > 0 ? (
            <div className="space-y-4">
              {notices.map((notice) => (
                <Card key={notice._id} hover>
                  <div className="md:flex md:justify-between md:items-start">
                    <CardContent className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <h3 className="font-bold text-lg text-gray-900">
                          {notice.title}
                        </h3>
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                          {notice.category}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">
                        {notice?.content?.substring(0, 150)}...
                      </p>
                      <p className="text-sm text-gray-500">
                        By Admin on{" "}
                        {new Date(notice.createdAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(notice._id)}
                      className="mt-4 md:mt-0"
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-500 text-lg">
                  No notices yet. Create one!
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Add Notice Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Add New Notice"
          size="lg"
          footer={
            <>
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Create Notice</Button>
            </>
          }
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="title"
              label="Notice Title"
              placeholder="Enter notice title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <Select
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleChange}
              options={categories}
            />

            <Textarea
              name="content"
              label="Content"
              placeholder="Enter notice content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              required
            />
          </form>
        </Modal>
      </AdminLayout>
    </ProtectedRoute>
  );
}
