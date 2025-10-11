'use client';

import { useState, useEffect } from 'react';
import SupportHeader from '@/components/SupportHeader';

export default function ReportBugPage() {
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);


  // Handle success animation
  useEffect(() => {
    if (submitted) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setShowSuccess(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setShowSuccess(false);
    }
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || description.trim().length < 10) {
      setHasError(true);
      return;
    }
    
    setHasError(false);

    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/movkkkyd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: description,
          _subject: 'New Bug Report - Pastree',
          browser: navigator.userAgent,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setDescription('');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    // Clear error when user starts typing
    if (hasError) {
      setHasError(false);
    }
  };

  // Show success message if submitted
  if (submitted) {
    return (
      <>
        <SupportHeader />
        <div className="min-h-screen bg-pastree-light py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className={`bg-white rounded-xl shadow-lg p-12 transition-all duration-700 ease-out transform ${
                showSuccess 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}>
                <div className={`text-lg mb-4 transition-all duration-1000 delay-200 ${
                  showSuccess 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}>
                  <svg 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-16 h-16 text-green-500 mx-auto"
                  >
                    {/* Outer circle with counterclockwise animation */}
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      className={`transition-all duration-1000 ${
                        showSuccess 
                          ? 'stroke-dasharray-56.5 stroke-dashoffset-0' 
                          : 'stroke-dasharray-56.5 stroke-dashoffset-56.5'
                      }`}
                      style={{
                        strokeDasharray: '56.5',
                        strokeDashoffset: showSuccess ? '0' : '56.5',
                        transform: 'rotate(-90deg)',
                        transformOrigin: '12px 12px'
                      }}
                    />
                    
                    {/* Checkmark with left-to-right animation */}
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M9 12.75 11.25 15 15 9.75" 
                      className={`transition-all duration-500 delay-1000 ${
                        showSuccess 
                          ? 'stroke-dasharray-15 stroke-dashoffset-0' 
                          : 'stroke-dasharray-15 stroke-dashoffset-15'
                      }`}
                      style={{
                        strokeDasharray: '15 100',
                        strokeDashoffset: showSuccess ? '0' : '15'
                      }}
                    />
                  </svg>
                </div>
                <h1 className={`text-4xl font-bold mb-4 transition-all duration-1000 delay-400 ${
                  showSuccess 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}>
                  Thank You!
                </h1>
                <p className={`text-xl text-gray-600 mb-6 transition-all duration-1000 delay-500 ${
                  showSuccess 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}>
                  {"We've received your bug report and will review it soon."}
                </p>
                <button
                  onClick={() => window.location.href = '/'}
                  className={`bg-pastree-orange hover:bg-pastree-orange-hover text-white px-6 py-3 rounded-lg font-semibold transition-all duration-1000 delay-600 ${
                    showSuccess 
                      ? 'opacity-100 translate-y-0 hover:scale-105' 
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  Go back to Pastree
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SupportHeader />
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
                    rows={8}
                    className={`w-full px-4 py-3 border rounded-lg resize-vertical min-h-[200px] transition-all duration-200 ease-in-out ${
                      hasError 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50' 
                        : 'border-gray-300 focus:border-transparent focus:ring-2 focus:ring-pastree-purple'
                    }`}
                    placeholder="Please provide as much detail as possible about the issue, including:
- What you were trying to do
- What happened instead
- Steps to reproduce the problem
- Your browser and operating system
- Any error messages you saw"
                  />
                  {hasError && (
                    <div className="mt-2 text-sm text-red-600 flex items-center transition-all duration-200 ease-in-out animate-in fade-in slide-in-from-top-1">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Please provide more details about the issue (at least 10 characters).
                    </div>
                  )}
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
                        <svg fill="currentColor" className="size-4 mr-2 inline align-text-bottom" viewBox="0 0 16 16">
                          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
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
    </>
  );
}