"use client";

import { useState } from "react";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Card } from "@/components/custom/Card";
import { Modal } from "@/components/custom/Modal";
import { galleryData } from "@/lib/constants/dummyData";
import { useClub } from "../../lib/hooks/useClub";

export default function GalleryPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const URL = BASE_URL + "/uploads";
  const [selectedImage, setSelectedImage] = useState(null);
  const { gallery } = useClub();

  return (
    <PublicLayout>
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Gallery</h1>
        <p className="text-xl text-gray-600 mb-12">
          Explore highlights from our events, workshops, and community
          activities
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.map((image) => (
            <Card
              key={image._id}
              className="cursor-pointer overflow-hidden p-0 hover:shadow-lg transition-shadow"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${URL}/${image.imageUrl}`}
                  alt={image.caption}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-gray-900">{image.caption}</p>
                <p className="text-xs text-gray-500 mt-1">{image.uploadedAt}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Image Modal */}
        <Modal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          size="lg"
        >
          {selectedImage && (
            <div>
              <img
                src={`${URL}/${selectedImage.imageUrl}`}
                alt={selectedImage.caption}
                className="w-full h-auto rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedImage.caption}
              </h3>
              <p className="text-gray-600 text-sm">
                Uploaded by Admin on {}{" "}
                {new Date(selectedImage.updatedAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </PublicLayout>
  );
}
