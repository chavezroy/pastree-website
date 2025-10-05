'use client';

import { useState } from 'react';

export default function ReportBugPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    browser: '',
    version: '',
    description: '',
    steps: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Bug report submitted! Thank you for helping us improve Pastree.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      browser: '',
      version: '',
      description: '',
      steps: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-pastree-light py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Report a Bug</h1>
            <p className="text-xl text-gray-600">
              Help us improve Pastree by reporting any issues you encounter
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastree-orange focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastree-orange focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="browser" className="block text-sm font-semibold text-gray-700 mb-2">
                    Browser
                  </label>
                  <select
                    id="browser"
                    name="browser"
                    value={formData.browser}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastree-orange focus:border-transparent"
                  >
                    <option value="">Select your browser</option>
                    <option value="chrome">Chrome</option>
                    <option value="firefox">Firefox</option>
                    <option value="edge">Edge</option>
                    <option value="safari">Safari</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="version" className="block text-sm font-semibold text-gray-700 mb-2">
                    Pastree Version
                  </label>
                  <input
                    type="text"
                    id="version"
                    name="version"
                    value={formData.version}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastree-orange focus:border-transparent"
                    placeholder="e.g., 1.1.0"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Bug Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastree-orange focus:border-transparent"
                  placeholder="Describe the bug you encountered..."
                />
              </div>

              <div>
                <label htmlFor="steps" className="block text-sm font-semibold text-gray-700 mb-2">
                  Steps to Reproduce
                </label>
                <textarea
                  id="steps"
                  name="steps"
                  value={formData.steps}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastree-orange focus:border-transparent"
                  placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pastree-orange hover:bg-pastree-orange-hover text-white py-4 rounded-lg font-semibold transition-colors"
              >
                Submit Bug Report
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
