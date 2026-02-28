"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Card, CardTitle, CardContent } from "@/components/custom/Card";
import { Input } from "@/components/custom/Input";
import { Select } from "@/components/custom/Select";
import { Button } from "@/components/custom/Button";
import { useAuth } from "@/lib/hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { registerStudent } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    year: "",
    branch: "",
    college: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const departments = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Information Technology", label: "Information Technology" },
    { value: "Electronics", label: "Electronics" },
    { value: "Mechanical", label: "Mechanical" },
    { value: "Civil", label: "Civil" },
    { value: "Other", label: "Other" },
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
    setError("");
    setSuccess("");

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.year ||
      !formData.branch ||
      !formData.college
    ) {
      console.log("Validation failed: Missing fields", formData);
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const result = registerStudent(formData);

    if (result.success) {
      setSuccess(result.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        year: "",
        branch: "",
        college: "",
      });
      router.push("/login");
    } else {
      setError(result.message);
      console.log("Registration error:", result);
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="max-w-2xl mx-auto py-12">
        <Card>
          <CardTitle className="text-center mb-6">
            Register as Student
          </CardTitle>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="name"
                label="Full Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                type="text"
                name="year"
                label="Year of Study"
                placeholder="e.g., 1st Year"
                value={formData.year}
                onChange={handleChange}
                required
              />

              <Input
                type="text"
                name="college"
                label="College Name"
                placeholder="e.g., ABC College"
                value={formData.college}
                onChange={handleChange}
                required
              />

              <Select
                name="branch"
                label="Branch"
                value={formData.branch}
                onChange={handleChange}
                options={departments}
                required
              />

              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Input
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login here
                </Link>
              </p>
            </div>

            <p className="mt-4 text-xs text-gray-500 text-center">
              By registering, you agree to our Terms of Service and Privacy
              Policy. Your account will require admin approval before
              activation.
            </p>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
