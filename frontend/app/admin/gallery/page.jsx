"use client";

import { useState, useRef } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent, CardTitle } from "@/components/custom/Card";
import { Input } from "@/components/custom/Input";
import { Button } from "@/components/custom/Button";
import { Modal } from "@/components/custom/Modal";
import { useClub } from "@/lib/hooks/useClub";
import { useAuth } from "@/lib/hooks/useAuth";

export default function AdminGalleryPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const URL = BASE_URL + "/uploads";
  const { gallery, uploadGalleryImage, removeGalleryImage } = useClub();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  console.log("Gallery data:", gallery);
  const [formData, setFormData] = useState({
    imageFile: null,
    caption: "",
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setImagePreview(null);
    setFormData({ imageFile: null, caption: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageFile) return;

    const result = await uploadGalleryImage({
      file: formData.imageFile,
      caption: formData.caption,
      uploadedBy: user?.name,
    });

    if (result.success) {
      handleModalClose();
    }
  };

  const handleDelete = (imageId) => {
    const result = removeGalleryImage(imageId);
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
                Gallery Management
              </h1>
              <p className="text-gray-600 mt-2">Manage gallery images</p>
            </div>
            <Button onClick={() => setModalOpen(true)}>+ Add Image</Button>
          </div>

          {deleteMessage && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {deleteMessage}
            </div>
          )}

          {gallery.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {gallery.map((image) => (
                <Card
                  key={image._id}
                  className="overflow-hidden p-0 hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={`${URL}/${image.imageUrl}`}
                      alt={image.caption}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <p className="font-semibold text-gray-900 truncate">
                      {image.caption}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {image.uploadedAt}
                    </p>
                    <Button
                      variant="danger"
                      size="sm"
                      className="w-full mt-3"
                      onClick={() => handleDelete(image._id)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-500 text-lg">No gallery images yet</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Upload Image Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={handleModalClose}
          title="Add Gallery Image"
          size="lg"
          footer={
            <>
              <Button variant="outline" onClick={handleModalClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={!formData.imageFile}>
                Upload
              </Button>
            </>
          }
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image File Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div className="space-y-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto max-h-40 object-contain rounded"
                    />
                    <p className="text-xs text-gray-500">
                      {formData.imageFile?.name}
                    </p>
                    <p className="text-xs text-blue-500 underline">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 py-4">
                    <svg
                      className="mx-auto h-10 w-10 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-sm text-gray-600">
                      Click to select an image
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF, WEBP up to 10MB
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                required
              />
            </div>

            <Input
              name="caption"
              label="Caption"
              placeholder="Event name or description"
              value={formData.caption}
              onChange={handleChange}
              required
            />
          </form>
        </Modal>
      </AdminLayout>
    </ProtectedRoute>
  );
}

// 'use client';

// import { useState } from 'react';
// import { AdminLayout } from '@/components/layouts/AdminLayout';
// import { ProtectedRoute } from '@/components/ProtectedRoute';
// import { Card, CardContent, CardTitle } from '@/components/custom/Card';
// import { Input } from '@/components/custom/Input';
// import { Button } from '@/components/custom/Button';
// import { Modal } from '@/components/custom/Modal';
// import { useClub } from '@/lib/hooks/useClub';
// import { useAuth } from '@/lib/hooks/useAuth';

// export default function AdminGalleryPage() {
//   const { gallery, uploadGalleryImage, removeGalleryImage } = useClub();
//   const { user } = useAuth();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [deleteMessage, setDeleteMessage] = useState('');
//   const [formData, setFormData] = useState({
//     imageUrl: '',
//     caption: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const result = uploadGalleryImage({
//       ...formData,
//       uploadedBy: user?.name,
//     });

//     if (result.success) {
//       setFormData({ imageUrl: '', caption: '' });
//       setModalOpen(false);
//     }
//   };

//   const handleDelete = (imageId) => {
//     const result = removeGalleryImage(imageId);
//     setDeleteMessage(result.message);
//     setTimeout(() => setDeleteMessage(''), 3000);
//   };

//   return (
//     <ProtectedRoute requiredRole="admin">
//       <AdminLayout>
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900">Gallery Management</h1>
//               <p className="text-gray-600 mt-2">Manage gallery images</p>
//             </div>
//             <Button onClick={() => setModalOpen(true)}>
//               + Add Image
//             </Button>
//           </div>

//           {deleteMessage && (
//             <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
//               {deleteMessage}
//             </div>
//           )}

//           {gallery.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {gallery.map((image) => (
//                 <Card key={image.id} className="overflow-hidden p-0 hover:shadow-lg transition-shadow">
//                   <div className="relative h-48 overflow-hidden bg-gray-100">
//                     <img
//                       src={image.imageUrl}
//                       alt={image.caption}
//                       className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
//                     />
//                   </div>
//                   <CardContent className="pt-4">
//                     <p className="font-semibold text-gray-900 truncate">{image.caption}</p>
//                     <p className="text-xs text-gray-500 mt-1">{image.uploadedAt}</p>
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       className="w-full mt-3"
//                       onClick={() => handleDelete(image.id)}
//                     >
//                       Delete
//                     </Button>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           ) : (
//             <Card className="text-center py-12">
//               <CardContent>
//                 <p className="text-gray-500 text-lg">No gallery images yet</p>
//               </CardContent>
//             </Card>
//           )}
//         </div>

//         {/* Upload Image Modal */}
//         <Modal
//           isOpen={modalOpen}
//           onClose={() => setModalOpen(false)}
//           title="Add Gallery Image"
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
//               name="imageUrl"
//               label="Image URL"
//               placeholder="https://example.com/image.jpg"
//               value={formData.imageUrl}
//               onChange={handleChange}
//               required
//             />

//             <Input
//               name="caption"
//               label="Caption"
//               placeholder="Event name or description"
//               value={formData.caption}
//               onChange={handleChange}
//               required
//             />

//             <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
//               Note: Enter a valid image URL. Use unsplash, imgur, or any public image hosting service.
//             </p>
//           </form>
//         </Modal>
//       </AdminLayout>
//     </ProtectedRoute>
//   );
// }
