'use client';

import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardTitle } from '@/components/custom/Card';
import { activitiesData } from '@/lib/constants/dummyData';

export default function ActivitiesPage() {
  return (
    <PublicLayout>
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Our Activities</h1>
        <p className="text-xl text-gray-600 mb-12">
          Discover the diverse range of activities and opportunities we offer to our members
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activitiesData.map((activity) => (
            <Card key={activity.id} hover className="h-full">
              <div className="text-5xl mb-4">{activity.icon}</div>
              <CardTitle>{activity.title}</CardTitle>
              <CardContent className="mt-4 text-gray-700 leading-relaxed">
                {activity.description}
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-16 p-8 bg-blue-50 rounded-lg border-2 border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Want to Join Our Club?</h2>
          <p className="text-gray-700 mb-6">
            Register now to participate in our activities and become part of a vibrant student community. New members are welcome to join at any time!
          </p>
          <div className="flex gap-4">
            <a href="/register" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Register Now
            </a>
            <a href="/contact" className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
