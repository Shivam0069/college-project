'use client';

import { useState } from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardTitle } from '@/components/custom/Card';
import { Input } from '@/components/custom/Input';
import { Textarea } from '@/components/custom/Textarea';
import { Button } from '@/components/custom/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <PublicLayout>
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Contact Us</h1>
        <p className="text-xl text-gray-600 mb-12">
          Have questions or want to get involved? We'd love to hear from you!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardTitle>Send us a Message</CardTitle>
            <CardContent className="mt-6">
              {submitted && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  name="name"
                  label="Your Name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <Input
                  type="email"
                  name="email"
                  label="Email Address"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <Input
                  type="text"
                  name="subject"
                  label="Subject"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />

                <Textarea
                  name="message"
                  label="Message"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                />

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardTitle>Get in Touch</CardTitle>
              <CardContent className="mt-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                  <p className="text-gray-600">contact@studentclub.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                  <p className="text-gray-600">Main Campus<br />Building A, Room 101</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardTitle>Office Hours</CardTitle>
              <CardContent className="mt-4 space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>10:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>2:00 PM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardTitle>Follow Us</CardTitle>
              <CardContent className="mt-4 flex gap-4">
                <a href="#" className="text-blue-600 hover:text-blue-700">Facebook</a>
                <a href="#" className="text-blue-600 hover:text-blue-700">Twitter</a>
                <a href="#" className="text-blue-600 hover:text-blue-700">Instagram</a>
                <a href="#" className="text-blue-600 hover:text-blue-700">LinkedIn</a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
