"use client";

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const ClubContext = createContext();

export const ClubProvider = ({ children }) => {
  const [notices, setNotices] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data on mount
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([
        fetchNotices(),
        fetchGallery(),
        fetchMaterials(),
        fetchEvents(),
      ]);
      setLoading(false);
    };
    fetchAll();
  }, []);

  // ============ NOTICE FUNCTIONS ============

  // GET /api/notices/
  const fetchNotices = async () => {
    try {
      const res = await api.get("/api/notices/");
      setNotices(res.data);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    }
  };

  // Add a new notice — POST /api/notices/
  const addNotice = async (noticeData) => {
    const { title, content, author, category } = noticeData;

    if (!title || !content) {
      return { success: false, message: "Title and content are required" };
    }

    try {
      const res = await api.post("/api/notices/", {
        title,
        content,
        author: author || "Admin",
        category: category || "General",
      });
      setNotices((prev) => [res.data, ...prev]);
      return {
        success: true,
        message: "Notice added successfully",
        notice: res.data,
      };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add notice";
      return { success: false, message };
    }
  };

  // Remove/delete a notice
  // TODO: Add DELETE /api/notices/:id endpoint on backend
  const removeNotice = async (noticeId) => {
    try {
      // await api.delete(`/api/notices/${noticeId}`);
      await api.delete(`/api/notices/${noticeId}`);
      setNotices((prev) =>
        prev.filter((n) => n._id !== noticeId && n.id !== noticeId),
      );
      return { success: true, message: "Notice deleted successfully" };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete notice";
      return { success: false, message };
    }
  };

  // Get all notices sorted by date
  const getNoticesByClub = () => {
    return [...notices].sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // ============ MATERIAL FUNCTIONS ============

  // TODO: Add GET /api/materials/ endpoint on backend
  const fetchMaterials = async () => {
    try {
      const res = await api.get("/api/materials/");
      setMaterials(res.data);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    }
  };

  // TODO: Add POST /api/materials/ endpoint on backend
  const uploadMaterial = async (materialData) => {
    const { title, category, fileType, uploadedBy, file } = materialData;

    if (!title || !category) {
      return { success: false, message: "Title and category are required" };
    }
    if (!file) {
      return { success: false, message: "File is required" };
    }

    try {
      const formData = new FormData();
      formData.append("file", file); // ← matches upload.single("file")
      formData.append("title", title);
      formData.append("category", category);
      formData.append("fileType", fileType || "pdf");
      if (uploadedBy) formData.append("uploadedBy", uploadedBy);

      const res = await api.post("/api/materials/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMaterials((prev) => [...prev, res.data]);
      return {
        success: true,
        message: "Material uploaded successfully",
        material: res.data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to upload material";
      return { success: false, message };
    }
  };

  // TODO: Add DELETE /api/materials/:id endpoint on backend
  const removeMaterial = async (materialId) => {
    try {
      await api.delete(`/api/materials/${materialId}`);
      setMaterials((prev) =>
        prev.filter((m) => m._id !== materialId && m.id !== materialId),
      );
      return { success: true, message: "Material deleted successfully" };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete material";
      return { success: false, message };
    }
  };

  // Get all materials sorted by upload date
  const getMaterialsByClub = () => {
    return [...materials].sort(
      (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt),
    );
  };

  // Get materials by category
  const getMaterialsByCategory = (category) => {
    return materials.filter((m) => m.category === category);
  };

  // TODO: Add PATCH /api/materials/:id/download endpoint on backend
  const incrementDownload = async (materialId) => {
    try {
      await api.patch(`/api/materials/${materialId}/download`);
      setMaterials((prev) =>
        prev.map((m) =>
          m._id === materialId || m.id === materialId
            ? { ...m, downloads: m.downloads + 1 }
            : m,
        ),
      );
    } catch (error) {
      console.error("Failed to increment download count:", error);
    }
  };

  // ============ EVENT FUNCTIONS ============

  // TODO: Add GET /api/events/ endpoint on backend
  const fetchEvents = async () => {
    try {
      const res = await api.get("/api/events/");
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  // TODO: Add POST /api/events/ endpoint on backend
  const addEvent = async (eventData) => {
    const { title, description, date, time, location, category } = eventData;

    if (!title || !date) {
      return { success: false, message: "Title and date are required" };
    }

    try {
      const res = await api.post("/api/events/", eventData);
      // setEvents((prev) => [...prev, res.data]);
      // return { success: true, message: 'Event created successfully', event: res.data };

      // TODO: Remove local fallback once backend endpoint is available

      setEvents((prev) => [...prev, res.data]);
      return {
        success: true,
        message: "Event created successfully",
        event: res.data,
      };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to create event";
      return { success: false, message };
    }
  };

  // TODO: Add DELETE /api/events/:id endpoint on backend
  const deleteEvent = async (eventId) => {
    try {
      await api.delete(`/api/events/${eventId}`);
      setEvents((prev) =>
        prev.filter((e) => e._id !== eventId && e.id !== eventId),
      );
      return { success: true, message: "Event deleted successfully" };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete event";
      return { success: false, message };
    }
  };

  // Get all events sorted by date
  const getEventsByClub = () => {
    return [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // TODO: Add PATCH /api/events/:id/attendees endpoint on backend
  const updateEventAttendees = async (eventId, count) => {
    try {
      // await api.patch(`/api/events/${eventId}/attendees`, { count });
      setEvents((prev) =>
        prev.map((e) =>
          e._id === eventId || e.id === eventId
            ? { ...e, attendees: count }
            : e,
        ),
      );
    } catch (error) {
      console.error("Failed to update attendees:", error);
    }
  };

  // ============ GALLERY FUNCTIONS ============

  // GET /api/gallery/
  const fetchGallery = async () => {
    try {
      const res = await api.get("/api/gallery/");
      setGallery(res.data);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    }
  };

  // Upload gallery image — POST /api/gallery/ (multipart/form-data)
  const uploadGalleryImage = async (imageData) => {
    const { file, caption, uploadedBy } = imageData;

    if (!file) {
      return { success: false, message: "Image file is required" };
    }

    try {
      const formData = new FormData();
      formData.append("image", file);
      if (caption) formData.append("caption", caption);
      if (uploadedBy) formData.append("uploadedBy", uploadedBy);

      const res = await api.post("/api/gallery/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setGallery((prev) => [res.data, ...prev]);
      return {
        success: true,
        message: "Image uploaded successfully",
        image: res.data,
      };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to upload image";
      return { success: false, message };
    }
  };

  // Remove gallery image
  // TODO: Add DELETE /api/gallery/:id endpoint on backend
  const removeGalleryImage = async (imageId) => {
    try {
      await api.delete(`/api/gallery/${imageId}`);
      setGallery((prev) =>
        prev.filter((img) => img._id !== imageId && img.id !== imageId),
      );
      return { success: true, message: "Image deleted successfully" };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete image";
      return { success: false, message };
    }
  };

  // Get all gallery images
  const getGalleryImages = () => {
    return gallery;
  };

  // ============ HELPER FUNCTIONS ============

  const getClubSummary = () => {
    return {
      totalNotices: notices.length,
      totalMaterials: materials.length,
      totalEvents: events.length,
      galleryImages: gallery.length,
    };
  };

  const value = {
    notices,
    materials,
    events,
    gallery,
    loading,
    addNotice,
    removeNotice,
    getNoticesByClub,
    uploadMaterial,
    removeMaterial,
    getMaterialsByClub,
    getMaterialsByCategory,
    incrementDownload,
    addEvent,
    deleteEvent,
    getEventsByClub,
    updateEventAttendees,
    uploadGalleryImage,
    removeGalleryImage,
    getGalleryImages,
    getClubSummary,
  };

  return <ClubContext.Provider value={value}>{children}</ClubContext.Provider>;
};

// 'use client';

// import React, { createContext, useState, useEffect } from 'react';
// import {
//   noticesData,
//   materialsData,
//   eventsData,
//   galleryData,
// } from '@/lib/constants/dummyData';

// export const ClubContext = createContext();

// export const ClubProvider = ({ children }) => {
//   const [notices, setNotices] = useState([]);
//   const [materials, setMaterials] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [gallery, setGallery] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Initialize from localStorage on mount
//   useEffect(() => {
//     const storedNotices = localStorage.getItem('clubNotices');
//     const storedMaterials = localStorage.getItem('clubMaterials');
//     const storedEvents = localStorage.getItem('clubEvents');
//     const storedGallery = localStorage.getItem('clubGallery');

//     setNotices(storedNotices ? JSON.parse(storedNotices) : noticesData);
//     setMaterials(storedMaterials ? JSON.parse(storedMaterials) : materialsData);
//     setEvents(storedEvents ? JSON.parse(storedEvents) : eventsData);
//     setGallery(storedGallery ? JSON.parse(storedGallery) : galleryData);

//     setLoading(false);
//   }, []);

//   // Save to localStorage whenever state changes
//   useEffect(() => {
//     localStorage.setItem('clubNotices', JSON.stringify(notices));
//   }, [notices]);

//   useEffect(() => {
//     localStorage.setItem('clubMaterials', JSON.stringify(materials));
//   }, [materials]);

//   useEffect(() => {
//     localStorage.setItem('clubEvents', JSON.stringify(events));
//   }, [events]);

//   useEffect(() => {
//     localStorage.setItem('clubGallery', JSON.stringify(gallery));
//   }, [gallery]);

//   // ============ NOTICE FUNCTIONS ============

//   // Add a new notice
//   const addNotice = (noticeData) => {
//     const { title, content, author, category } = noticeData;

//     if (!title || !content) {
//       return { success: false, message: 'Title and content are required' };
//     }

//     const newNotice = {
//       id: `notice${Date.now()}`,
//       title,
//       content,
//       author: author || 'Admin',
//       date: new Date().toISOString().split('T')[0],
//       category: category || 'General',
//     };

//     setNotices([newNotice, ...notices]);
//     return {
//       success: true,
//       message: 'Notice added successfully',
//       notice: newNotice,
//     };
//   };

//   // Remove/delete a notice
//   const removeNotice = (noticeId) => {
//     const notice = notices.find((n) => n.id === noticeId);
//     if (!notice) {
//       return { success: false, message: 'Notice not found' };
//     }

//     setNotices(notices.filter((n) => n.id !== noticeId));
//     return {
//       success: true,
//       message: `Notice "${notice.title}" deleted successfully`,
//     };
//   };

//   // Get all notices
//   const getNoticesByClub = () => {
//     return notices.sort((a, b) => new Date(b.date) - new Date(a.date));
//   };

//   // ============ MATERIAL FUNCTIONS ============

//   // Upload study material
//   const uploadMaterial = (materialData) => {
//     const { title, category, fileType, uploadedBy } = materialData;

//     if (!title || !category) {
//       return { success: false, message: 'Title and category are required' };
//     }

//     const newMaterial = {
//       id: `material${Date.now()}`,
//       title,
//       category,
//       fileType: fileType || 'pdf',
//       uploadedBy: uploadedBy || 'Admin',
//       uploadedAt: new Date().toISOString().split('T')[0],
//       downloads: 0,
//     };

//     setMaterials([...materials, newMaterial]);
//     return {
//       success: true,
//       message: 'Material uploaded successfully',
//       material: newMaterial,
//     };
//   };

//   // Remove material
//   const removeMaterial = (materialId) => {
//     const material = materials.find((m) => m.id === materialId);
//     if (!material) {
//       return { success: false, message: 'Material not found' };
//     }

//     setMaterials(materials.filter((m) => m.id !== materialId));
//     return {
//       success: true,
//       message: `Material "${material.title}" deleted successfully`,
//     };
//   };

//   // Get all materials
//   const getMaterialsByClub = () => {
//     return materials.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
//   };

//   // Get materials by category
//   const getMaterialsByCategory = (category) => {
//     return materials.filter((m) => m.category === category);
//   };

//   // Increment download count
//   const incrementDownload = (materialId) => {
//     const updatedMaterials = materials.map((m) =>
//       m.id === materialId ? { ...m, downloads: m.downloads + 1 } : m
//     );
//     setMaterials(updatedMaterials);
//   };

//   // ============ EVENT FUNCTIONS ============

//   // Add event
//   const addEvent = (eventData) => {
//     const { title, description, date, time, location, category } = eventData;

//     if (!title || !date) {
//       return { success: false, message: 'Title and date are required' };
//     }

//     const newEvent = {
//       id: `event${Date.now()}`,
//       title,
//       description: description || '',
//       date,
//       time: time || '10:00 AM',
//       location: location || 'Main Campus',
//       category: category || 'Event',
//       attendees: 0,
//     };

//     setEvents([...events, newEvent]);
//     return {
//       success: true,
//       message: 'Event created successfully',
//       event: newEvent,
//     };
//   };

//   // Delete event
//   const deleteEvent = (eventId) => {
//     const event = events.find((e) => e.id === eventId);
//     if (!event) {
//       return { success: false, message: 'Event not found' };
//     }

//     setEvents(events.filter((e) => e.id !== eventId));
//     return {
//       success: true,
//       message: `Event "${event.title}" deleted successfully`,
//     };
//   };

//   // Get all events
//   const getEventsByClub = () => {
//     return events.sort((a, b) => new Date(b.date) - new Date(a.date));
//   };

//   // Update event attendees
//   const updateEventAttendees = (eventId, count) => {
//     const updatedEvents = events.map((e) =>
//       e.id === eventId ? { ...e, attendees: count } : e
//     );
//     setEvents(updatedEvents);
//   };

//   // ============ GALLERY FUNCTIONS ============

//   // Upload gallery image
//   const uploadGalleryImage = (imageData) => {
//     const { imageUrl, caption, uploadedBy } = imageData;

//     if (!imageUrl) {
//       return { success: false, message: 'Image URL is required' };
//     }

//     const newImage = {
//       id: `gallery${Date.now()}`,
//       imageUrl,
//       caption: caption || 'Gallery Image',
//       uploadedBy: uploadedBy || 'Admin',
//       uploadedAt: new Date().toISOString().split('T')[0],
//     };

//     setGallery([newImage, ...gallery]);
//     return {
//       success: true,
//       message: 'Image uploaded successfully',
//       image: newImage,
//     };
//   };

//   // Remove gallery image
//   const removeGalleryImage = (imageId) => {
//     const image = gallery.find((img) => img.id === imageId);
//     if (!image) {
//       return { success: false, message: 'Image not found' };
//     }

//     setGallery(gallery.filter((img) => img.id !== imageId));
//     return {
//       success: true,
//       message: 'Image deleted successfully',
//     };
//   };

//   // Get all gallery images
//   const getGalleryImages = () => {
//     return gallery;
//   };

//   // ============ HELPER FUNCTIONS ============

//   // Get all club data summary
//   const getClubSummary = () => {
//     return {
//       totalNotices: notices.length,
//       totalMaterials: materials.length,
//       totalEvents: events.length,
//       galleryImages: gallery.length,
//     };
//   };

//   const value = {
//     notices,
//     materials,
//     events,
//     gallery,
//     loading,
//     addNotice,
//     removeNotice,
//     getNoticesByClub,
//     uploadMaterial,
//     removeMaterial,
//     getMaterialsByClub,
//     getMaterialsByCategory,
//     incrementDownload,
//     addEvent,
//     deleteEvent,
//     getEventsByClub,
//     updateEventAttendees,
//     uploadGalleryImage,
//     removeGalleryImage,
//     getGalleryImages,
//     getClubSummary,
//   };

//   return (
//     <ClubContext.Provider value={value}>
//       {children}
//     </ClubContext.Provider>
//   );
// };
