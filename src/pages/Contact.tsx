import React from 'react';
import PageHeader from '../components/PageHeader';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div>
      <PageHeader 
        title="Contact Us" 
        description="We'd love to hear from you"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-playfair mb-6">Get in Touch</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                Send Message
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-playfair mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">support@mytaylorzone.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+91 123 456 7890</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">123 Fashion Street, Mumbai, Maharashtra 400001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}