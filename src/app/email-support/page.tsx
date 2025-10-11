'use client';

import { useState, useEffect } from 'react';

export default function EmailSupportPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    category: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [errors, setErrors] = useState<{[key: string]: boolean}>({});
  const [isMounted, setIsMounted] = useState(false);

  // Handle success animation
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setShowSuccess(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setShowSuccess(false);
    }
  }, [submitted]);

  // Update character count
  useEffect(() => {
    setCharCount(formData.message.length);
  }, [formData.message]);

  // Handle client-side mounting to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const newErrors: {[key: string]: boolean} = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = true;
    if (!formData.lastName.trim()) newErrors.lastName = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.category.trim()) newErrors.category = true;
    if (!formData.subject.trim()) newErrors.subject = true;
    if (!formData.message.trim()) newErrors.message = true;
    
    // Check message length
    if (formData.message.trim().length < 20) {
      newErrors.message = true;
    }
    
    // If there are any errors, show them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xwprrrzw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          category: formData.category,
          subject: formData.subject,
          message: formData.message,
          _subject: 'New Email Support Request - Pastree',
          browser: navigator.userAgent,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          category: '',
          subject: '',
          message: ''
        });
        window.scrollTo(0, 0);
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

  // Show success message if submitted
  if (submitted) {
    return (
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
                {"We've received your support request and will respond as soon as possible."}
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
    );
  }

  return (
    <div className="min-h-screen bg-pastree-light py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Email Support</h1>
            <p className="text-xl text-gray-600">
              Get personalized help from our support team
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {!isMounted ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded mb-6"></div>
                <div className="h-12 bg-gray-200 rounded mb-6"></div>
                <div className="h-12 bg-gray-200 rounded mb-6"></div>
                <div className="h-32 bg-gray-200 rounded mb-6"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      autoComplete="given-name"
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ease-in-out ${
                        errors.firstName 
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50' 
                          : 'border-gray-300 focus:border-transparent focus:ring-2 focus:ring-pastree-purple'
                      }`}
                    />
                    {errors.firstName && (
                      <div className="mt-2 text-sm text-red-600 flex items-center transition-all duration-200 ease-in-out animate-in fade-in slide-in-from-top-1">
                        <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        First name is required.
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      autoComplete="family-name"
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ease-in-out ${
                        errors.lastName 
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50' 
                          : 'border-gray-300 focus:border-transparent focus:ring-2 focus:ring-pastree-purple'
                      }`}
                    />
                    {errors.lastName && (
                      <div className="mt-2 text-sm text-red-600 flex items-center transition-all duration-200 ease-in-out animate-in fade-in slide-in-from-top-1">
                        <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Last name is required.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ease-in-out ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50' 
                        : 'border-gray-300 focus:border-transparent focus:ring-2 focus:ring-pastree-purple'
                    }`}
                  />
                  {errors.email && (
                    <div className="mt-2 text-sm text-red-600 flex items-center transition-all duration-200 ease-in-out animate-in fade-in slide-in-from-top-1">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Email address is required.
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-1">{"We'll use this email to respond to your inquiry."}</p>
                </div>

                <div className="mb-6">
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                    Category<span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    autoComplete="off"
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ease-in-out ${
                      errors.category 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50' 
                        : 'border-gray-300 focus:border-transparent focus:ring-2 focus:ring-pastree-purple'
                    }`}
                  >
                    <option value="">Select a category</option>
                    <option value="installation">Installation & Setup</option>
                    <option value="usage">Using Pastree</option>
                    <option value="settings">Settings & Preferences</option>
                    <option value="troubleshooting">Troubleshooting</option>
                    <option value="billing">Billing & Account</option>
                    <option value="feature-request">Feature Request</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.category && (
                    <div className="mt-2 text-sm text-red-600 flex items-center transition-all duration-200 ease-in-out animate-in fade-in slide-in-from-top-1">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Please select a category.
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your issue"
                    autoComplete="off"
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ease-in-out ${
                      errors.subject 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50' 
                        : 'border-gray-300 focus:border-transparent focus:ring-2 focus:ring-pastree-purple'
                    }`}
                  />
                  {errors.subject && (
                    <div className="mt-2 text-sm text-red-600 flex items-center transition-all duration-200 ease-in-out animate-in fade-in slide-in-from-top-1">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Subject is required.
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message<span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    autoComplete="off"
                    rows={8}
                    className={`w-full px-4 py-3 border rounded-lg resize-vertical min-h-[200px] transition-all duration-200 ease-in-out ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50' 
                        : 'border-gray-300 focus:border-transparent focus:ring-2 focus:ring-pastree-purple'
                    }`}
                    placeholder="Please describe your issue in detail. Include:
- What you were trying to do
- What happened instead
- Steps to reproduce the problem
- Any error messages you saw"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm">
                      {errors.message ? (
                        <span className="text-red-600 flex items-center transition-all duration-200 ease-in-out animate-in fade-in slide-in-from-top-1">
                          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {formData.message.trim().length < 20 
                            ? 'Please provide more details in your message (at least 20 characters).'
                            : 'Message is required.'
                          }
                        </span>
                      ) : charCount < 20 ? (
                        <span className="text-yellow-600">Please provide more details (at least 20 characters)</span>
                      ) : charCount > 1000 ? (
                        <span className="text-blue-600">Detailed message - great!</span>
                      ) : (
                        <span className="text-gray-500">Good detail level</span>
                      )}
                    </p>
                    <span className="text-sm text-gray-500">{charCount} characters</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-700 text-sm flex items-center">
                    <span className="mr-2">🔒</span>
                    Security tip: Never share personal information.
                  </p>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-pastree-orange hover:bg-pastree-orange-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
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
                        Send Support Request
                      </>
                    )}
                  </button>
                  <p className="text-sm text-gray-500 mt-3">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}