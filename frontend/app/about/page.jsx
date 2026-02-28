'use client';

import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardTitle } from '@/components/custom/Card';

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">About Our Club</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2">
            <CardTitle>Our Mission</CardTitle>
            <CardContent className="mt-4 text-gray-700 leading-relaxed">
              <p>
                We are a dynamic student club dedicated to fostering innovation, collaboration, and professional growth among students. Our mission is to create a supportive environment where students can learn new technologies, develop practical skills, and build meaningful connections with peers and industry professionals.
              </p>
              <p className="mt-4">
                Through our diverse range of activities including coding sessions, workshops, hackathons, and networking events, we aim to bridge the gap between academic learning and real-world application.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardTitle>Our Vision</CardTitle>
            <CardContent className="mt-4 text-gray-700">
              <p>
                To become the leading student organization that empowers students to excel in technology and innovation, creating future leaders and innovators in the tech industry.
              </p>
            </CardContent>
          </Card>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-bold text-gray-900 mb-2">Excellence</h3>
                <p className="text-sm text-gray-600">Pursuing high standards in everything we do</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center">
                <div className="text-3xl mb-2">🤝</div>
                <h3 className="font-bold text-gray-900 mb-2">Collaboration</h3>
                <p className="text-sm text-gray-600">Working together to achieve common goals</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center">
                <div className="text-3xl mb-2">💡</div>
                <h3 className="font-bold text-gray-900 mb-2">Innovation</h3>
                <p className="text-sm text-gray-600">Embracing new ideas and creative thinking</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center">
                <div className="text-3xl mb-2">📚</div>
                <h3 className="font-bold text-gray-900 mb-2">Learning</h3>
                <p className="text-sm text-gray-600">Continuous growth and knowledge development</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our History</h2>
          <Card>
            <CardContent className="text-gray-700 leading-relaxed">
              <p>
                Founded in 2020, our student club has grown from a small group of passionate students to a thriving community of over 500 members. What started as informal coding sessions has evolved into a comprehensive platform offering workshops, competitions, networking opportunities, and collaborative projects.
              </p>
              <p className="mt-4">
                Over the years, we've hosted numerous successful events, produced talented alumni now working in leading tech companies, and contributed significantly to the academic and technical development of our student community.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </PublicLayout>
  );
}
