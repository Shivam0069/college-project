"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Card, CardTitle, CardContent } from "@/components/custom/Card";
import { Input } from "@/components/custom/Input";
import { Button } from "@/components/custom/Button";
import { useAuth } from "@/lib/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { loginUser, isAuthenticated, userRole } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  if (isAuthenticated) {
    router.push(`/${userRole}/dashboard`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    const result = await loginUser(email, password);
    console.log("Login result:", result);

    if (result.success) {
      // Redirect based on role
      if (result.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/student/dashboard");
      }
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="max-w-md mx-auto py-12">
        <Card>
          <CardTitle className="text-center mb-6">Student Login</CardTitle>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                type="password"
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-semibold text-sm mb-2">Demo Credentials:</p>
              <p className="text-xs text-gray-600 mb-1">
                <strong>Admin:</strong> admin@club.com / admin123
              </p>
              <p className="text-xs text-gray-600">
                <strong>Student:</strong> student@email.com / student123
              </p>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
