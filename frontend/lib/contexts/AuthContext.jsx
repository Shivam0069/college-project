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

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("guest");
  const [pendingStudents, setPendingStudents] = useState([]);
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize from stored token on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setUserRole(parsedUser.role);
    }

    setLoading(false);
  }, []);

  // Fetch pending and approved students when admin is logged in
  useEffect(() => {
    if (userRole === "admin" && isAuthenticated) {
      fetchAllUsers();
    }
  }, [userRole, isAuthenticated]);

  // Fetch all users (admin only) — GET /api/users/
  const fetchAllUsers = async () => {
    try {
      const response = await api.get("/api/users/");
      const users = response.data;

      const pending = users.filter((u) => u.status === "pending");
      const approved = users.filter((u) => u.status === "approved");

      setPendingStudents(pending);
      setApprovedStudents(approved);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Login user with email and password — POST /api/auth/login
  const loginUser = async (email, password) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      const { token, user: loggedInUser } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(loggedInUser));

      setUser(loggedInUser);
      setIsAuthenticated(true);
      setUserRole(loggedInUser.role);

      return {
        success: true,
        message: "Login successful",
        role: loggedInUser.role,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid email or password";
      return { success: false, message };
    }
  };

  // Register new student — POST /api/auth/register
  const registerStudent = async (studentData) => {
    try {
      const response = await api.post("/api/auth/register", studentData);
      return {
        success: true,
        message:
          response.data?.message ||
          "Registration successful. Please wait for admin approval.",
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Registration failed. Try again.";
      return { success: false, message };
    }
  };

  // Logout user
  const logoutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
    setIsAuthenticated(false);
    setUserRole("guest");
    setPendingStudents([]);
    setApprovedStudents([]);
    return { success: true, message: "Logged out successfully" };
  };

  // Admin function to approve student — PATCH /api/users/approve/:id
  const approveStudent = async (studentId) => {
    try {
      const response = await api.patch(`/api/users/approve/${studentId}`);

      // Update local state
      const student = pendingStudents.find(
        (s) => s.id === studentId || s._id === studentId,
      );
      if (student) {
        const approvedStudent = { ...student, status: "approved" };
        setApprovedStudents((prev) => [...prev, approvedStudent]);
        setPendingStudents((prev) =>
          prev.filter((s) => s.id !== studentId && s._id !== studentId),
        );
      }

      return {
        success: true,
        message: response.data?.message || "Student approved successfully",
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to approve student";
      return { success: false, message };
    }
  };

  // Admin function to block/reject student — PATCH /api/users/block/:id
  const rejectStudent = async (studentId) => {
    try {
      const response = await api.patch(`/api/users/block/${studentId}`);

      // Update local state — remove from pending
      setPendingStudents((prev) =>
        prev.filter((s) => s.id !== studentId && s._id !== studentId),
      );

      return {
        success: true,
        message: response.data?.message || "Student rejected/blocked",
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to reject student";
      return { success: false, message };
    }
  };

  // Get student by ID — no dedicated endpoint found, searching local state
  // TODO: Add GET /api/users/:id endpoint on backend for direct lookup
  const getStudentById = (studentId) => {
    return (
      approvedStudents.find((s) => s.id === studentId || s._id === studentId) ||
      pendingStudents.find((s) => s.id === studentId || s._id === studentId)
    );
  };

  const value = {
    user,
    isAuthenticated,
    userRole,
    pendingStudents,
    approvedStudents,
    loading,
    loginUser,
    registerStudent,
    logoutUser,
    approveStudent,
    rejectStudent,
    getStudentById,
    fetchAllUsers,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 'use client';

// import React, { createContext, useState, useEffect } from 'react';
// import { dummyUsers, pendingStudentsData, approvedStudentsData } from '@/lib/constants/dummyData';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState('guest');
//   const [pendingStudents, setPendingStudents] = useState([]);
//   const [approvedStudents, setApprovedStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Initialize from localStorage on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem('authUser');
//     const storedPending = localStorage.getItem('pendingStudents');
//     const storedApproved = localStorage.getItem('approvedStudents');

//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//       setIsAuthenticated(true);
//       setUserRole(parsedUser.role);
//     }

//     if (storedPending) {
//       setPendingStudents(JSON.parse(storedPending));
//     } else {
//       setPendingStudents(pendingStudentsData);
//     }

//     if (storedApproved) {
//       setApprovedStudents(JSON.parse(storedApproved));
//     } else {
//       setApprovedStudents(approvedStudentsData);
//     }

//     setLoading(false);
//   }, []);

//   // Save to localStorage whenever state changes
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('authUser', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('authUser');
//     }
//   }, [user]);

//   useEffect(() => {
//     localStorage.setItem('pendingStudents', JSON.stringify(pendingStudents));
//   }, [pendingStudents]);

//   useEffect(() => {
//     localStorage.setItem('approvedStudents', JSON.stringify(approvedStudents));
//   }, [approvedStudents]);

//   // Login user with email and password
//   const loginUser = (email, password) => {
//     // Check admin login
//     if (email === dummyUsers.admin.email && password === dummyUsers.admin.password) {
//       const adminUser = { ...dummyUsers.admin };
//       setUser(adminUser);
//       setIsAuthenticated(true);
//       setUserRole('admin');
//       return { success: true, message: 'Admin login successful' };
//     }

//     // Check student login
//     if (email === dummyUsers.student.email && password === dummyUsers.student.password) {
//       const studentUser = { ...dummyUsers.student };
//       setUser(studentUser);
//       setIsAuthenticated(true);
//       setUserRole('student');
//       return { success: true, message: 'Student login successful' };
//     }

//     // Check against approved students
//     const approvedStudent = approvedStudents.find(
//       (student) => student.email === email
//     );
//     if (approvedStudent) {
//       // For demo, accept any password for registered students
//       const studentUser = {
//         id: approvedStudent.id,
//         email: approvedStudent.email,
//         name: approvedStudent.name,
//         roll: approvedStudent.roll,
//         department: approvedStudent.department,
//         role: 'student',
//         approved: true,
//       };
//       setUser(studentUser);
//       setIsAuthenticated(true);
//       setUserRole('student');
//       return { success: true, message: 'Student login successful' };
//     }

//     return { success: false, message: 'Invalid email or password' };
//   };

//   // Register new student
//   const registerStudent = (studentData) => {
//     const { email, password, name, roll, department } = studentData;

//     // Check if email already exists
//     if (
//       email === dummyUsers.admin.email ||
//       email === dummyUsers.student.email ||
//       pendingStudents.some((s) => s.email === email) ||
//       approvedStudents.some((s) => s.email === email)
//     ) {
//       return { success: false, message: 'Email already registered' };
//     }

//     // Add to pending students
//     const newStudent = {
//       id: `pending${Date.now()}`,
//       name,
//       email,
//       roll,
//       department,
//       registeredAt: new Date().toISOString().split('T')[0],
//       status: 'pending',
//       password, // Store password (in real app, would hash this)
//     };

//     setPendingStudents([...pendingStudents, newStudent]);
//     return {
//       success: true,
//       message: 'Registration successful. Please wait for admin approval.',
//     };
//   };

//   // Logout user
//   const logoutUser = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     setUserRole('guest');
//     return { success: true, message: 'Logged out successfully' };
//   };

//   // Admin function to approve student
//   const approveStudent = (studentId) => {
//     const student = pendingStudents.find((s) => s.id === studentId);
//     if (!student) {
//       return { success: false, message: 'Student not found' };
//     }

//     // Move from pending to approved
//     const approvedStudent = {
//       id: student.id,
//       name: student.name,
//       email: student.email,
//       roll: student.roll,
//       department: student.department,
//       approvedAt: new Date().toISOString().split('T')[0],
//     };

//     setApprovedStudents([...approvedStudents, approvedStudent]);
//     setPendingStudents(pendingStudents.filter((s) => s.id !== studentId));

//     return {
//       success: true,
//       message: `${student.name} approved successfully`,
//     };
//   };

//   // Admin function to reject/remove student
//   const rejectStudent = (studentId) => {
//     const student = pendingStudents.find((s) => s.id === studentId);
//     if (!student) {
//       return { success: false, message: 'Student not found' };
//     }

//     setPendingStudents(pendingStudents.filter((s) => s.id !== studentId));
//     return {
//       success: true,
//       message: `${student.name} rejected`,
//     };
//   };

//   // Get student by ID
//   const getStudentById = (studentId) => {
//     return (
//       approvedStudents.find((s) => s.id === studentId) ||
//       pendingStudents.find((s) => s.id === studentId)
//     );
//   };

//   const value = {
//     user,
//     isAuthenticated,
//     userRole,
//     pendingStudents,
//     approvedStudents,
//     loading,
//     loginUser,
//     registerStudent,
//     logoutUser,
//     approveStudent,
//     rejectStudent,
//     getStudentById,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
