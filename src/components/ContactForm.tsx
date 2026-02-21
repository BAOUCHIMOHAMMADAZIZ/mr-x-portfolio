'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { API_ENDPOINTS, SECTIONS } from '@/lib/constants';
import { ContactFormResponse, ContactFormError } from '@/types/api';
import { useInView } from '@/hooks/useInView';

interface FormState {
  email: string;
  phone: string;
  message: string;
  website: string;
}

interface SubmitState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  successMessage: string;
  submissionId: string;
}

export default function ContactForm() {
  const { ref, isInView } = useInView();
  const [formData, setFormData] = useState<FormState>({
    email: '',
    phone: '',
    message: '',
    website: '',
  });

  const [errors, setErrors] = useState<ContactFormError>({});

  const [submitState, setSubmitState] = useState<SubmitState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    submissionId: '',
  });

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormError]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset previous states
    setErrors({});
    setSubmitState({
      isLoading: true,
      isSuccess: false,
      isError: false,
      errorMessage: '',
      successMessage: '',
      submissionId: '',
    });

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          website: formData.website,
        }),
      });

      const data: ContactFormResponse = await response.json();

      if (!response.ok) {
        // Handle validation or other errors
        if (data.details) {
          setErrors(data.details as ContactFormError);
        }

        setSubmitState((prev) => ({
          ...prev,
          isLoading: false,
          isError: true,
          errorMessage: data.error || 'Failed to submit form. Please try again.',
        }));
        return;
      }

      // Success
      setSubmitState((prev) => ({
        ...prev,
        isLoading: false,
        isSuccess: true,
        successMessage: data.message || "Message received! We'll get back to you soon.",
        submissionId: data.submissionId || '',
      }));

      // Clear form
      setFormData({ email: '', phone: '', message: '', website: '' });

      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitState((prev) => ({
          ...prev,
          isSuccess: false,
          successMessage: '',
        }));
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitState((prev) => ({
        ...prev,
        isLoading: false,
        isError: true,
        errorMessage: 'Network error. Please try again later.',
      }));
    }
  };

  return (
    <section
      ref={ref}
      id={SECTIONS.CONTACT}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-12 ${isInView ? 'animate-slide-in-up' : 'opacity-0'}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Ready to build the future?
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-white to-gray-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-text text-base md:text-lg">
            Whether you need to automate a workflow, build an AI agent, or architect a
            full-stack platform, I'm here to help you scale.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`space-y-6 ${isInView ? 'animate-scale-in' : 'opacity-0'}`}
        >
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-text mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              disabled={submitState.isLoading}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400/50 focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-white/20 hover:border-white/40 transition-all duration-300 disabled:opacity-50"
              required
            />
            {errors.email && (
              <p className="mt-2 text-sm text-error animate-fade-in">{errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-text mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 000-0000"
              disabled={submitState.isLoading}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400/50 focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-white/20 hover:border-white/40 transition-all duration-300 disabled:opacity-50"
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-error animate-fade-in">{errors.phone}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-text mb-2"
            >
              Project Details
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell me about your project..."
              rows={6}
              disabled={submitState.isLoading}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400/50 focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-white/20 hover:border-white/40 transition-all duration-300 disabled:opacity-50 resize-none"
              required
            />
            {errors.message && (
              <p className="mt-2 text-sm text-error animate-fade-in">{errors.message}</p>
            )}
          </div>

          {/* Honeypot Field (Hidden) */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitState.isLoading}
            className="w-full relative group bg-gradient-to-r from-white via-gray-200 to-white/80 text-black font-semibold py-4 px-6 rounded-lg hover:shadow-2xl hover:shadow-white/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <span className="relative block">
              {submitState.isLoading ? 'Sending...' : 'Send Message'}
            </span>
          </button>

          {/* Error Alert - Bottom */}
          {submitState.isError && (
            <div className="mt-4 animate-fade-in">
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="text-xl">⚠</div>
                  <p className="text-red-300 font-semibold">{submitState.errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Alert - Bottom */}
          {submitState.isSuccess && (
            <div className="mt-4 animate-fade-in">
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">✓</div>
                  <div className="flex-1">
                    <p className="text-green-300 font-semibold text-lg">Message Sent</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
