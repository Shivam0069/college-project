// 'use client';

// import { useState } from 'react';
// import { AdminLayout } from '@/components/layouts/AdminLayout';
// import { ProtectedRoute } from '@/components/ProtectedRoute';
// import { Card, CardContent, CardTitle } from '@/components/custom/Card';
// import { Input } from '@/components/custom/Input';
// import { Select } from '@/components/custom/Select';
// import { Button } from '@/components/custom/Button';
// import { Modal } from '@/components/custom/Modal';
// import { useClub } from '@/lib/hooks/useClub';
// import { useAuth } from '@/lib/hooks/useAuth';

// export default function AdminMaterialsPage() {
//   const { materials, uploadMaterial, removeMaterial } = useClub();
//   const { user } = useAuth();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [deleteMessage, setDeleteMessage] = useState('');
//   const [formData, setFormData] = useState({
//     title: '',
//     category: '',
//     fileType: 'pdf',
//   });

//   const categories = [
//     { value: 'Computer Science', label: 'Computer Science' },
//     { value: 'Web Development', label: 'Web Development' },
//     { value: 'Database', label: 'Database' },
//     { value: 'Programming', label: 'Programming' },
//     { value: 'AI/ML', label: 'AI/ML' },
//     { value: 'Other', label: 'Other' },
//   ];

//   const fileTypes = [
//     { value: 'pdf', label: 'PDF' },
//     { value: 'doc', label: 'Document' },
//     { value: 'ppt', label: 'Presentation' },
//     { value: 'video', label: 'Video' },
//     { value: 'other', label: 'Other' },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const result = uploadMaterial({
//       ...formData,
//       uploadedBy: user?.name,
//     });

//     if (result.success) {
//       setFormData({ title: '', category: '', fileType: 'pdf' });
//       setModalOpen(false);
//     }
//   };

//   const handleDelete = (materialId) => {
//     const result = removeMaterial(materialId);
//     setDeleteMessage(result.message);
//     setTimeout(() => setDeleteMessage(''), 3000);
//   };

//   // Group materials by category
//   const categories_list = [...new Set(materials.map((m) => m.category))];

//   return (
//     <ProtectedRoute requiredRole="admin">
//       <AdminLayout>
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900">Study Materials</h1>
//               <p className="text-gray-600 mt-2">Upload and manage study materials</p>
//             </div>
//             <Button onClick={() => setModalOpen(true)}>
//               + Upload Material
//             </Button>
//           </div>

//           {deleteMessage && (
//             <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
//               {deleteMessage}
//             </div>
//           )}

//           {materials.length > 0 ? (
//             <div className="space-y-8">
//               {categories_list.map((category) => {
//                 const categoryMaterials = materials.filter((m) => m.category === category);
//                 return (
//                   <div key={category}>
//                     <h2 className="text-2xl font-bold text-gray-900 mb-4">{category}</h2>
//                     <div className="space-y-3">
//                       {categoryMaterials.map((material) => (
//                         <Card key={material.id} hover>
//                           <div className="md:flex md:justify-between md:items-center">
//                             <CardContent className="flex-1">
//                               <div className="flex items-start gap-3 mb-2">
//                                 <span className="text-2xl">📄</span>
//                                 <div>
//                                   <h3 className="font-bold text-lg text-gray-900">{material.title}</h3>
//                                   <p className="text-sm text-gray-600 mt-1">
//                                     {material.fileType.toUpperCase()} • {material.downloads} downloads • {material.uploadedAt}
//                                   </p>
//                                 </div>
//                               </div>
//                             </CardContent>
//                             <Button
//                               variant="danger"
//                               size="sm"
//                               onClick={() => handleDelete(material.id)}
//                               className="mt-3 md:mt-0"
//                             >
//                               Delete
//                             </Button>
//                           </div>
//                         </Card>
//                       ))}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <Card className="text-center py-12">
//               <CardContent>
//                 <p className="text-gray-500 text-lg">No materials uploaded yet</p>
//               </CardContent>
//             </Card>
//           )}
//         </div>

//         {/* Upload Material Modal */}
//         <Modal
//           isOpen={modalOpen}
//           onClose={() => setModalOpen(false)}
//           title="Upload Study Material"
//           size="lg"
//           footer={
//             <>
//               <Button
//                 variant="outline"
//                 onClick={() => setModalOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button onClick={handleSubmit}>
//                 Upload
//               </Button>
//             </>
//           }
//         >
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               name="title"
//               label="Material Title"
//               placeholder="e.g., Data Structures Basics"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />

//             <Select
//               name="category"
//               label="Category"
//               value={formData.category}
//               onChange={handleChange}
//               options={categories}
//               required
//             />

//             <Select
//               name="fileType"
//               label="File Type"
//               value={formData.fileType}
//               onChange={handleChange}
//               options={fileTypes}
//             />

//             <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
//               Note: In a real application, this would handle file uploads. For this demo, just enter the material details.
//             </p>
//           </form>
//         </Modal>
//       </AdminLayout>
//     </ProtectedRoute>
//   );
// }

"use client";

import { useState, useRef } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent, CardTitle } from "@/components/custom/Card";
import { Input } from "@/components/custom/Input";
import { Select } from "@/components/custom/Select";
import { Button } from "@/components/custom/Button";
import { Modal } from "@/components/custom/Modal";
import { useClub } from "@/lib/hooks/useClub";
import { useAuth } from "@/lib/hooks/useAuth";

export default function AdminMaterialsPage() {
  const { materials, uploadMaterial, removeMaterial } = useClub();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    fileType: "pdf",
  });
  const fileInputRef = useRef(null);

  const categories = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Web Development", label: "Web Development" },
    { value: "Database", label: "Database" },
    { value: "Programming", label: "Programming" },
    { value: "AI/ML", label: "AI/ML" },
    { value: "Other", label: "Other" },
  ];

  const fileTypes = [
    { value: "pdf", label: "PDF" },
    { value: "doc", label: "Document" },
    { value: "ppt", label: "Presentation" },
    { value: "video", label: "Video" },
    { value: "other", label: "Other" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedFile(null);
    setFormData({ title: "", category: "", fileType: "pdf" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const result = await uploadMaterial({
      title: formData.title,
      category: formData.category,
      fileType: formData.fileType,
      uploadedBy: user?.name,
      file: selectedFile,
    });

    if (result.success) {
      handleModalClose();
    }
  };

  const handleDelete = async (materialId) => {
    const result = await removeMaterial(materialId);
    setDeleteMessage(result.message);
    setTimeout(() => setDeleteMessage(""), 3000);
  };

  const categories_list = [...new Set(materials.map((m) => m.category))];

  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Study Materials
              </h1>
              <p className="text-gray-600 mt-2">
                Upload and manage study materials
              </p>
            </div>
            <Button onClick={() => setModalOpen(true)}>
              + Upload Material
            </Button>
          </div>

          {deleteMessage && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {deleteMessage}
            </div>
          )}

          {materials.length > 0 ? (
            <div className="space-y-8">
              {categories_list.map((category) => {
                const categoryMaterials = materials.filter(
                  (m) => m.category === category,
                );
                return (
                  <div key={category}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {category}
                    </h2>
                    <div className="space-y-3">
                      {categoryMaterials.map((material) => (
                        <Card key={material._id || material.id} hover>
                          <div className="md:flex md:justify-between md:items-center">
                            <CardContent className="flex-1">
                              <div className="flex items-start gap-3 mb-2">
                                <span className="text-2xl">📄</span>
                                <div>
                                  <h3 className="font-bold text-lg text-gray-900">
                                    {material.title}
                                  </h3>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {material.fileType.toUpperCase()} •{" "}
                                    {material.downloads} downloads •{" "}
                                    {material.createdAt?.split("T")[0]}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() =>
                                handleDelete(material._id || material.id)
                              }
                              className="mt-3 md:mt-0"
                            >
                              Delete
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-500 text-lg">
                  No materials uploaded yet
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Upload Material Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={handleModalClose}
          title="Upload Study Material"
          size="lg"
          footer={
            <>
              <Button variant="outline" onClick={handleModalClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  !selectedFile || !formData.title || !formData.category
                }
              >
                Upload
              </Button>
            </>
          }
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="title"
              label="Material Title"
              placeholder="e.g., Data Structures Basics"
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
              required
            />

            <Select
              name="fileType"
              label="File Type"
              value={formData.fileType}
              onChange={handleChange}
              options={fileTypes}
            />

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                File <span className="text-red-500">*</span>
              </label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedFile ? (
                  <div className="space-y-1 py-2">
                    <p className="text-2xl">📄</p>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p className="text-xs text-blue-500 underline">
                      Click to change file
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 py-4">
                    <p className="text-3xl">📁</p>
                    <p className="text-sm text-gray-600">
                      Click to select a file
                    </p>
                    <p className="text-xs text-gray-400">
                      PDF, DOC, PPT, Video, etc.
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mkv"
              />
            </div>
          </form>
        </Modal>
      </AdminLayout>
    </ProtectedRoute>
  );
}
