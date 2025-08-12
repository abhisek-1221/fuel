"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, X } from 'lucide-react';
import useVapi from '@/hooks/use-vapi';
 
interface RadialCardProps {
  assistantId: string;
}

const RadialCard: React.FC<RadialCardProps> = ({ assistantId }) => {
  const { volumeLevel, isSessionActive, toggleCall, conversation } = useVapi(assistantId);
  const [bars, setBars] = useState(Array(50).fill(0));
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
 
  useEffect(() => {
    if (isSessionActive) {
      updateBars(volumeLevel);
    } else {
      resetBars();
    }
  }, [volumeLevel, isSessionActive]);

  // Log conversation updates to console
  useEffect(() => {
    if (conversation.length > 0) {
      console.log('Live Transcript Update:', conversation[conversation.length - 1]);
      console.log('Full Conversation:', conversation);
    }
  }, [conversation]);

  const openTranscript = () => {
    console.log('Transcript modal opened. Full transcript:', conversation);
    setIsTranscriptOpen(true);
  };

  const closeTranscript = () => setIsTranscriptOpen(false);
 
  const updateBars = (volume: number) => {
    setBars(bars.map(() => Math.random() * volume * 50));
  };
 
  const resetBars = () => {
    setBars(Array(50).fill(0));
  };
 
  return (
      <div className='border text-center justify-items-center p-4 rounded-2xl'>
        <div className="flex items-center justify-center h-full relative" style={{ width: '300px', height: '300px' }}>
          { isSessionActive ? 
          <MicOff
            size={24}
            className="text-black dark:text-white"
            onClick={toggleCall}
            style={{ cursor: 'pointer', zIndex: 10 }}
          />
          :
          <Mic
          size={28}
          className="text-black dark:text-white"
          onClick={toggleCall}
          style={{ cursor: 'pointer', zIndex: 10 }}
          />
          }
          <svg width="100%" height="100%" viewBox="0 0 300 300" style={{ position: 'absolute', top: 0, left: 0 }}>
            {bars.map((height, index) => {
              const angle = (index / bars.length) * 360;
              const radians = (angle * Math.PI) / 180;
              const x1 = 150 + Math.cos(radians) * 50;
              const y1 = 150 + Math.sin(radians) * 50;
              const x2 = 150 + Math.cos(radians) * (100 + height);
              const y2 = 150 + Math.sin(radians) * (100 + height);
 
              return (
                <motion.line
                  key={index}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className="stroke-current text-black dark:text-white dark:opacity-70 opacity-70"
                  strokeWidth="2"
                  initial={{ x2: x1, y2: y1 }}
                  animate={{ x2, y2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              );
            })}
          </svg>
          <span className="absolute top-48 w-[calc(100%-70%)] h-[calc(100%-70%)] bg-primary blur-[120px]"></span>
        </div>
        
        {/* Live Transcript Display (enlarged) */}
        {conversation.length > 0 && (
          <div className="mt-6 max-h-80 overflow-y-auto">
            <h3 className="text-base font-semibold mb-3 text-gray-700 dark:text-gray-300">Live Transcript</h3>
            <div className="space-y-3 text-left">
              {conversation.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-lg text-base leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-blue-100 dark:bg-blue-900/60 ml-8 text-blue-900 dark:text-blue-100'
                      : 'bg-gray-100 dark:bg-gray-800/60 mr-8 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <span className="font-semibold mr-1">
                    {message.role === 'user' ? 'You:' : 'Assistant:'}
                  </span>
                  <span>
                    {message.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Show Transcript Button */}
        <div className="mt-4">
          <button
            onClick={openTranscript}
            className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
          >
            Show Transcript
          </button>
        </div>

        {/* Transcript Modal */}
        {isTranscriptOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={closeTranscript} />
            <div className="relative z-10 w-full max-w-3xl mx-4 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-black/10 dark:border-white/10">
              <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Conversation Transcript</h2>
                <button onClick={closeTranscript} aria-label="Close transcript">
                  <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
              <div className="p-4 max-h-[70vh] overflow-y-auto">
                {conversation.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">No transcript yet.</p>
                ) : (
                  <div className="space-y-3">
                    {conversation.map((message, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-xl text-base leading-relaxed ${
                          message.role === 'user'
                            ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100'
                            : 'bg-gray-100 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        <span className="font-semibold mr-1">
                          {message.role === 'user' ? 'You:' : 'Assistant:'}
                        </span>
                        <span>{message.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-black/10 dark:border-white/10 flex justify-end">
                <button
                  onClick={closeTranscript}
                  className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};
 
export default RadialCard;


