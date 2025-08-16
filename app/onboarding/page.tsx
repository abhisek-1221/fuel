"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { User, Globe, Languages, Calendar, ChevronDown } from 'lucide-react';

const accentOptions = [
  'Indian English',
  'American English',
  'British English',
  'African English'
];

const genderOptions = [
  'male',
  'female',
  'nonbinary'
];

export default function Onboarding() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    accent: '',
    nativeLanguage: '',
    location: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user profile');
      }

      const result = await response.json();
      
      // Redirect to test page after successful onboarding (works for both new and existing users)
      router.push('/test');
    } catch (err) {
      console.error('Onboarding error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create your profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.age && formData.gender && formData.accent && formData.nativeLanguage && formData.location;

  return (
    <main className="min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="fixed top-0 w-full h-screen bg-gradient-to-br from-amber-50 to-orange-100 bg-center -z-10" />
      
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg"
        >
          {/* Onboarding Card */}
          <div 
            className="relative rounded-3xl overflow-hidden p-8"
            style={{
              background: `linear-gradient(135deg, rgb(245, 235, 220) 0%, rgb(232, 218, 196) 50%, rgb(218, 200, 170) 100%)`,
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 0 0 1px rgba(255, 255, 255, 0.3) inset,
                0 2px 4px 0 rgba(255, 255, 255, 0.4) inset,
                0 -2px 8px 0 rgba(160, 135, 105, 0.2) inset
              `,
              transform: 'perspective(1000px) rotateX(2deg)',
            }}
          >
            {/* Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-amber-200/30 to-orange-200/20 rounded-full blur-xl" />
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-tr from-yellow-200/20 to-amber-200/15 rounded-full blur-xl" />
            
            {/* Header */}
            <div className="relative text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 shadow-lg mb-4"
              >
                <User className="w-8 h-8 text-amber-700" />
              </motion.div>
              <h1 className="text-3xl font-bold text-amber-900 mb-2">Welcome to Fuel!</h1>
              <p className="text-amber-700/80">Tell us a bit about yourself to get started</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Age Field */}
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Age *
                </label>
                <input
                  type="number"
                  min="13"
                  max="120"
                  required
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200/50 bg-white/60 backdrop-blur-sm
                           focus:border-amber-400 focus:outline-none transition-all duration-200
                           text-amber-900 placeholder-amber-600/50"
                  placeholder="Enter your age"
                  style={{
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.4) inset'
                  }}
                />
              </div>

              {/* Gender Field */}
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Gender *
                </label>
                <div className="relative">
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200/50 bg-white/60 backdrop-blur-sm
                             focus:border-amber-400 focus:outline-none transition-all duration-200
                             text-amber-900 appearance-none cursor-pointer"
                    style={{
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.4) inset'
                    }}
                  >
                    <option value="">Select your gender</option>
                    {genderOptions.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600 pointer-events-none" />
                </div>
              </div>

              {/* Accent Field */}
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Accent / Dialect *
                </label>
                <div className="relative">
                  <select
                    required
                    value={formData.accent}
                    onChange={(e) => handleInputChange('accent', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-amber-200/50 bg-white/60 backdrop-blur-sm
                             focus:border-amber-400 focus:outline-none transition-all duration-200
                             text-amber-900 appearance-none cursor-pointer"
                    style={{
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.4) inset'
                    }}
                  >
                    <option value="">Select your accent</option>
                    {accentOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600 pointer-events-none" />
                </div>
              </div>

              {/* Native Language Field */}
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">
                  <Languages className="w-4 h-4 inline mr-2" />
                  Native Language *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nativeLanguage}
                  onChange={(e) => handleInputChange('nativeLanguage', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200/50 bg-white/60 backdrop-blur-sm
                           focus:border-amber-400 focus:outline-none transition-all duration-200
                           text-amber-900 placeholder-amber-600/50"
                  placeholder="e.g., Hindi, Spanish, Mandarin"
                  style={{
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.4) inset'
                  }}
                />
              </div>

              {/* Location Field */}
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Location / Country *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200/50 bg-white/60 backdrop-blur-sm
                           focus:border-amber-400 focus:outline-none transition-all duration-200
                           text-amber-900 placeholder-amber-600/50"
                  placeholder="e.g., India, United States, United Kingdom"
                  style={{
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.4) inset'
                  }}
                />
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-red-100/80 border border-red-200"
                >
                  <p className="text-red-700 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!isFormValid || isLoading}
                whileHover={{ scale: isFormValid && !isLoading ? 1.02 : 1 }}
                whileTap={{ scale: isFormValid && !isLoading ? 0.98 : 1 }}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  isFormValid && !isLoading
                    ? 'text-white shadow-lg hover:shadow-xl'
                    : 'text-amber-400 cursor-not-allowed'
                }`}
                style={{
                  background: isFormValid && !isLoading
                    ? `linear-gradient(135deg, rgb(180, 155, 125) 0%, rgb(160, 135, 105) 100%)`
                    : `rgba(180, 155, 125, 0.3)`,
                  boxShadow: isFormValid && !isLoading
                    ? `0 8px 20px rgba(160, 135, 105, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.3) inset`
                    : 'none',
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Profile...
                  </div>
                ) : (
                  'Complete Setup'
                )}
              </motion.button>
            </form>

            {/* Required Fields Note */}
            <p className="text-xs text-amber-700/60 text-center mt-4">
              * All fields are required
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
