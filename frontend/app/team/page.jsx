'use client';

import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardTitle } from '@/components/custom/Card';
import { teamData } from '@/lib/constants/dummyData';

export default function TeamPage() {
  return (
    <PublicLayout>
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Our Team</h1>
        <p className="text-xl text-gray-600 mb-12">
          Meet the dedicated leaders and organizers who drive our club forward
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamData.map((member) => (
            <Card key={member.id} className="text-center hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover"
                />
              </div>
              <CardTitle>{member.name}</CardTitle>
              <div className="mt-2">
                <p className="text-blue-600 font-semibold text-sm mb-2">{member.position}</p>
                <CardContent className="text-sm text-gray-600">
                  {member.bio}
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Interested in Leadership?</h2>
          <Card className="p-8 text-center">
            <CardContent>
              <p className="text-gray-700 mb-6">
                We're always looking for passionate students to join our leadership team. If you're interested in organizing events, mentoring members, or taking on other leadership roles, we'd love to hear from you!
              </p>
              <a href="/contact" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block">
                Get in Touch
              </a>
            </CardContent>
          </Card>
        </section>
      </div>
    </PublicLayout>
  );
}
