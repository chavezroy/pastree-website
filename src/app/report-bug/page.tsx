'use client';

import { useState } from 'react';

export default function ReportBugPage() {
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (description.trim().length < 10) {
      alert('Please provide more details about the issue (at least 10 characters).');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      alert('Thank you for your bug report! We\'ll review it and get back to you if we need more information.');
      setDescription('');
      setIsSubmitting(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
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
            <p className="text-center mb-4 text-gray-600">
              Please share details that can help us understand the issue.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
              <small className="text-blue-700 flex items-center">
                <span className="mr-2">🔒</span>
                Security tip: Never share personal information.
              </small>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="bug-description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Describe the issue {"you're"} experiencing:
                </label>
                <textarea
                  id="bug-description"
                  name="bug-description"
                  value={description}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastree-orange focus:border-transparent resize-vertical min-h-[200px]"
                  placeholder="Please provide as much detail as possible about the issue, including:
- What you were trying to do
- What happened instead
- Steps to reproduce the problem
- Your browser and operating system
- Any error messages you saw"
                />
                <small className="text-gray-500 float-end mt-1">
                  {description.length} characters
                </small>
              </div>
              
              <div className="text-center mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-pastree-orange hover:bg-pastree-orange-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[150px]"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Submit Report
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
