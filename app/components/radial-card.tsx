"use client";
import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, X } from 'lucide-react';
import useVapi from '@/hooks/use-vapi';
 
export interface RadialCardHandle {
  requestScore: () => void;
  getCanScore: () => boolean;
}

interface RadialCardProps {
  assistantId: string;
  questTitle: string;
}

const RadialCard = forwardRef<RadialCardHandle, RadialCardProps>(({ assistantId, questTitle }, ref) => {
  const { volumeLevel, isSessionActive, toggleCall, conversation } = useVapi(assistantId);
  const [bars, setBars] = useState(Array(50).fill(0));
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const liveTranscriptEndRef = useRef<HTMLDivElement | null>(null);
  const [isScoring, setIsScoring] = useState(false);
  const [scoreModalOpen, setScoreModalOpen] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [scoreError, setScoreError] = useState<string | null>(null);
 
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

  // Auto scroll live transcript to newest message
  useEffect(() => {
    liveTranscriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const openTranscript = () => {
    console.log('Transcript modal opened. Full transcript:', conversation);
    setIsTranscriptOpen(true);
  };

  const closeTranscript = () => setIsTranscriptOpen(false);

  const requestScore = async () => {
    if (conversation.length === 0) return;
    try {
      setIsScoring(true);
      setScoreError(null);
      const res = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation, questTitle }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Failed to score');
      }
      const data = await res.json();
      console.log('Score response:', data);
      setScore(typeof data.score === 'number' ? data.score : null);
      setScoreModalOpen(true);
    } catch (err: any) {
      console.error('Score error:', err);
      setScoreError(err?.message || 'Failed to score');
    } finally {
      setIsScoring(false);
    }
  };

  const getCanScore = () => !isSessionActive && conversation.length > 0 && !isScoring;

  useImperativeHandle(ref, () => ({ requestScore, getCanScore }), [isSessionActive, conversation, isScoring]);
 
  const updateBars = (volume: number) => {
    setBars(bars.map(() => Math.random() * volume * 50));
  };
 
  const resetBars = () => {
    setBars(Array(50).fill(0));
  };
 
  return (
      <div className='border text-center justify-items-center p-4 rounded-2xl relative'>
        {/* Show Transcript Button (top-right) */}
        <button
          onClick={openTranscript}
          className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition text-sm"
          aria-label="Show transcript"
        >
          Show Transcript
        </button>
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
        
        {/* Live Transcript Display (enlarged, transparent bubbles) */}
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
                  className={`text-base leading-relaxed ${
                    message.role === 'user' ? 'ml-8' : 'mr-8'
                  } text-gray-900 dark:text-gray-100`}
                >
                  <span className="font-semibold mr-1">
                    {message.role === 'user' ? 'You:' : 'Assistant:'}
                  </span>
                  <span>
                    {message.text}
                  </span>
                </motion.div>
              ))}
              <div ref={liveTranscriptEndRef} />
            </div>
          </div>
        )}

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
                        className={`text-base leading-relaxed ${
                          message.role === 'user' ? 'ml-2' : 'mr-2'
                        } text-gray-900 dark:text-gray-100`}
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

        {/* Score Modal */}
        {scoreModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setScoreModalOpen(false)} />
            <div className="relative z-10 w-full max-w-md mx-4 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-black/10 dark:border-white/10">
              <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Your Score</h2>
                <button onClick={() => setScoreModalOpen(false)} aria-label="Close score">
                  <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
              <div className="p-6 text-center">
                {isScoring ? (
                  <p className="text-gray-700 dark:text-gray-300">Scoring…</p>
                ) : score == null ? (
                  <p className="text-gray-700 dark:text-gray-300">Unable to determine a score.</p>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Scale: 0 to 500</p>
                    <div className="text-5xl font-bold text-emerald-600 dark:text-emerald-400">{score}</div>
                  </div>
                )}
                {scoreError && (
                  <p className="mt-3 text-sm text-red-600 dark:text-red-400">{scoreError}</p>
                )}
              </div>
              <div className="p-4 border-t border-black/10 dark:border-white/10 flex justify-end">
                <button
                  onClick={() => setScoreModalOpen(false)}
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
});
 
export default RadialCard;


