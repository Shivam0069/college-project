"use client";

import Link from "next/link";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Button } from "@/components/custom/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/custom/Card";
import { activitiesData } from "@/lib/constants/dummyData";

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg mb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Student Club</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Fostering Innovation, Collaboration, and Growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-green-600 "
              >
                Join Us
              </Button>
            </Link>
            <Link href="/events">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-green-600"
              >
                View Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          Our Activities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activitiesData.map((activity) => (
            <Card key={activity.id} hover>
              <div className="text-4xl mb-4">{activity.icon}</div>
              <CardTitle>{activity.title}</CardTitle>
              <CardContent className="mt-2">
                <CardDescription>{activity.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">500+</div>
              <p className="text-gray-600 mt-2">Active Members</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <p className="text-gray-600 mt-2">Annual Events</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">100+</div>
              <p className="text-gray-600 mt-2">Study Materials</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
        <p className="text-gray-600 mb-6 text-lg">
          Become part of our vibrant student community. Learn, grow, and
          collaborate with fellow students.
        </p>
        <Link href="/register">
          <Button size="lg">Register Now</Button>
        </Link>
      </section>
    </PublicLayout>
  );
}
