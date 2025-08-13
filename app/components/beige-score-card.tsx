"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { X, Trophy, Sparkles, Star, TrendingUp, CheckCircle } from 'lucide-react';

interface BeigeScoreCardProps {
  isOpen: boolean;
  onClose: () => void;
  score: number | null;
  stars: number | null;
  summary: string;
  strengths: string[];
  improvements: string[];
  isLoading: boolean;
  error: string | null;
}

const BeigeScoreCard: React.FC<BeigeScoreCardProps> = ({
  isOpen,
  onClose,
  score,
  stars,
  summary,
  strengths,
  improvements,
  isLoading,
  error
}) => {
  if (!isOpen) return null;

  const getPerformanceLevel = (score: number | null) => {
    if (!score) return 'Unrated';
    if (score >= 450) return 'Exceptional';
    if (score >= 400) return 'Excellent';
    if (score >= 350) return 'Good';
    if (score >= 300) return 'Fair';
    return 'Needs Improvement';
  };

  const getPerformanceColor = (score: number | null) => {
    if (!score) return 'text-amber-600';
    if (score >= 450) return 'text-emerald-600';
    if (score >= 400) return 'text-green-600';
    if (score >= 350) return 'text-amber-600';
    if (score >= 300) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Main Card Container */}
      <motion.div
        className="relative w-full max-w-4xl mx-auto max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* 3D Beige Card */}
        <div 
          className="relative rounded-3xl overflow-hidden"
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
          <div className="relative px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-amber-900/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 shadow-lg">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-amber-900">Performance Report</h2>
                  <p className="text-xs sm:text-sm text-amber-700/70">Your conversation analysis</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-200 group"
              >
                <X className="w-5 h-5 text-amber-800 group-hover:text-amber-900" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-h-[60vh] overflow-y-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mb-4" />
                <p className="text-amber-800 font-medium">Analyzing your performance...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="p-4 rounded-2xl bg-red-100 mb-4">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-red-700 font-medium text-center">{error}</p>
              </div>
            ) : score === null ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="p-4 rounded-2xl bg-amber-100 mb-4">
                  <Sparkles className="w-8 h-8 text-amber-600" />
                </div>
                <p className="text-amber-800 font-medium text-center">Unable to determine score</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Score Section */}
                <div className="lg:col-span-1">
                  <div 
                    className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 100%)`,
                      boxShadow: `
                        0 8px 32px rgba(0, 0, 0, 0.1),
                        0 0 0 1px rgba(255, 255, 255, 0.5) inset,
                        0 2px 4px 0 rgba(255, 255, 255, 0.6) inset
                      `,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/30" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-amber-600" />
                        <span className="text-sm font-semibold text-amber-800 uppercase tracking-wide">Score</span>
                      </div>
                      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-900 mb-2">{score}</div>
                      <p className="text-xs sm:text-sm text-amber-700 mb-4">out of 500</p>
                      <div className={`text-base sm:text-lg font-semibold mb-4 sm:mb-6 ${getPerformanceColor(score)}`}>
                        {getPerformanceLevel(score)}
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full mb-4 sm:mb-6">
                        <div className="h-2 sm:h-3 w-full bg-amber-200/50 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max(0, Math.min(100, (score / 500) * 100))}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        </div>
                        <p className="text-xs text-amber-700 mt-2">
                          {Math.round((score / 500) * 100)}% of maximum score
                        </p>
                      </div>
                      
                      {/* Stars */}
                      <div className="flex items-center justify-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const filled = (stars ?? Math.round(score / 100)) > i;
                          return (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: i * 0.1, duration: 0.5 }}
                            >
                              <Star 
                                className={`w-6 h-6 ${
                                  filled 
                                    ? 'text-yellow-500 fill-yellow-500' 
                                    : 'text-amber-300'
                                }`} 
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  {/* Summary */}
                  {summary && (
                    <div 
                      className="p-4 sm:p-6 rounded-xl sm:rounded-2xl"
                      style={{
                        background: `rgba(255, 255, 255, 0.4)`,
                        boxShadow: `0 4px 16px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.4) inset`,
                      }}
                    >
                      <h3 className="text-base sm:text-lg font-semibold text-amber-900 mb-3">Summary</h3>
                      <p className="text-sm sm:text-base text-amber-800 leading-relaxed">{summary}</p>
                    </div>
                  )}

                  {/* Strengths and Improvements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Strengths */}
                    <div 
                      className="p-4 sm:p-6 rounded-xl sm:rounded-2xl"
                      style={{
                        background: `rgba(34, 197, 94, 0.1)`,
                        boxShadow: `0 4px 16px rgba(34, 197, 94, 0.1), 0 0 0 1px rgba(34, 197, 94, 0.2) inset`,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                        <h3 className="text-base sm:text-lg font-semibold text-emerald-800">Strengths</h3>
                      </div>
                      <ul className="space-y-3">
                        {(strengths.length ? strengths : ['Clear communication', 'Polite tone', 'Stayed on topic'])
                          .slice(0, 4)
                          .map((strength, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-3 text-emerald-700"
                            >
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm leading-relaxed text-left">{strength}</span>
                            </motion.li>
                          ))}
                      </ul>
                    </div>

                    {/* Improvements */}
                    <div 
                      className="p-4 sm:p-6 rounded-xl sm:rounded-2xl"
                      style={{
                        background: `rgba(59, 130, 246, 0.1)`,
                        boxShadow: `0 4px 16px rgba(59, 130, 246, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.2) inset`,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        <h3 className="text-base sm:text-lg font-semibold text-blue-800">Areas to Improve</h3>
                      </div>
                      <ul className="space-y-3">
                        {(improvements.length ? improvements : ['Answer quicker', 'Give more details', 'Ask clarifying questions'])
                          .slice(0, 4)
                          .map((improvement, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-3 text-blue-700"
                            >
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm leading-relaxed text-left">{improvement}</span>
                            </motion.li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div 
            className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-t border-amber-900/10"
            style={{
              background: `rgba(255, 255, 255, 0.3)`,
            }}
          >
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, rgb(180, 155, 125) 0%, rgb(160, 135, 105) 100%)`,
                  boxShadow: `
                    0 4px 12px rgba(160, 135, 105, 0.3),
                    0 0 0 1px rgba(255, 255, 255, 0.3) inset,
                    0 2px 4px 0 rgba(255, 255, 255, 0.4) inset
                  `,
                  color: 'white',
                }}
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BeigeScoreCard;
