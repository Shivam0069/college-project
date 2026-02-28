"use client";

import { StudentLayout } from "@/components/layouts/StudentLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent, CardTitle } from "@/components/custom/Card";
import { Button } from "@/components/custom/Button";
import { useClub } from "@/lib/hooks/useClub";

export default function StudentMaterialsPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const URL = BASE_URL + "/uploads";
  const { materials, incrementDownload } = useClub();

  // Group materials by category
  const categories = [...new Set(materials.map((m) => m.category))];

  const handleDownload = (material) => {
    incrementDownload(material._id);
    window.open(`${URL}/${material.file}`, "_blank");
  };

  return (
    <ProtectedRoute requiredRole="student">
      <StudentLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Study Materials
            </h1>
            <p className="text-gray-600 mt-2">
              Download resources and learning materials
            </p>
          </div>

          {materials.length > 0 ? (
            <div className="space-y-8">
              {categories.map((category) => {
                const categoryMaterials = materials.filter(
                  (m) => m.category === category,
                );
                return (
                  <div key={category}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {category}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryMaterials.map((material) => (
                        <Card key={material.id} hover>
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">📄</span>
                              <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                {material.fileType.toUpperCase()}
                              </span>
                            </div>
                            <h3 className="font-bold text-gray-900">
                              {material.title}
                            </h3>
                          </div>
                          <CardContent>
                            <p className="text-xs text-gray-600 mb-3">
                              Uploaded by {material.uploadedBy} on{" "}
                              {material.createdAt.split("T")[0]}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {material.downloads} downloads
                              </span>
                              <Button
                                size="sm"
                                onClick={() => handleDownload(material)}
                              >
                                Download
                              </Button>
                            </div>
                          </CardContent>
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
                  No study materials available yet
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </StudentLayout>
    </ProtectedRoute>
  );
}
