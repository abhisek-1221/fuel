"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ArrowLeft } from 'lucide-react';
import RadialCard, { RadialCardHandle } from './radial-card';
import { GradientButton } from './gradientbut';

interface ConversationRoomProps {
  questTitle: string;
  assistantId: string;
  narrationAudioUrl: string;
  onBack: () => void;
}

const ConversationRoom: React.FC<ConversationRoomProps> = ({ 
  questTitle, 
  assistantId,
  narrationAudioUrl, 
  onBack 
}) => {
  const radialRef = React.useRef<RadialCardHandle | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [canScore, setCanScore] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState<number | null>(null);
  const [sessionActive, setSessionActive] = React.useState(false);
  const [isInitiating, setIsInitiating] = React.useState(false);
  const [showIntro, setShowIntro] = React.useState(true);
  const [audioPlaying, setAudioPlaying] = React.useState(false);
  const getQuestColor = (title: string) => {
    switch (title.toLowerCase()) {
      case 'girlfriend':
      case "forgot girlfriend's birthday":
        return 'from-pink-500/10 to-purple-500/10';
      case 'waiter':
      case 'hr interview':
        return 'from-orange-500/10 to-red-500/10';
      case 'customer':
      case 'veg customer':
        return 'from-blue-500/10 to-cyan-500/10';
      case 'luggage':
      case 'lost luggage':
        return 'from-green-500/10 to-emerald-500/10';
      default:
        return 'from-gray-500/10 to-slate-500/10';
    }
  };

  // Audio intro handling
  React.useEffect(() => {
    if (showIntro && audioRef.current) {
      audioRef.current.play().then(() => {
        setAudioPlaying(true);
      }).catch((error) => {
        console.error('Audio play failed:', error);
        // If audio fails to play, skip intro automatically
        setShowIntro(false);
      });
    }
  }, [showIntro]);

  const handleAudioEnd = () => {
    setAudioPlaying(false);
    setShowIntro(false);
  };

  const skipIntro = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setAudioPlaying(false);
    setShowIntro(false);
  };

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={narrationAudioUrl}
        onEnded={handleAudioEnd}
        preload="auto"
      />

      <AnimatePresence mode="wait">
        {showIntro ? (
          // Intro Screen
          <motion.div
            key="intro-screen"
            className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-50 to-orange-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Skip Button */}
            <motion.div
              className="absolute top-6 right-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={skipIntro}
                className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-full text-amber-900 font-semibold shadow-lg hover:bg-white/90 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Skip Intro
              </motion.button>
            </motion.div>

            {/* Intro Content */}
            <motion.div
              className="text-center max-w-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h1 
                className="text-4xl sm:text-5xl font-bold text-amber-900 mb-6"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                {questTitle} Quest
              </motion.h1>
              
              {audioPlaying ? (
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8">
                  <DotLottieReact
                    src="https://lottie.host/046a38e7-1a8a-49bc-9baf-0cc1425294e2/H1v74tcKWe.lottie"
                    loop
                    autoplay
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              ) : (
                <motion.div
                  className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full" />
                </motion.div>
              )}

              <motion.p 
                className="text-lg sm:text-xl text-amber-800 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {audioPlaying ? "Listen to the quest briefing..." : "Preparing your quest..."}
              </motion.p>

              {audioPlaying && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-amber-700"
                >
                  Audio is playing...
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ) : (
          // Main Conversation Room
          <motion.div
            key="conversation-room"
            className="min-h-screen flex flex-col overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
      <div className="relative z-10 pt-8 px-4 pb-4 sm:p-6">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GradientButton
              onClick={onBack}
              variant="beige"
              size="lg"
              className="flex items-center space-x-1 sm:space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Quests</span>
              <span className="sm:hidden">Back</span>
            </GradientButton>
          </motion.div>
          
          <div className="text-center flex-1 mx-4">
            <h1 className="hidden sm:block text-xl lg:text-2xl font-bold text-black">{questTitle} Quest</h1>
            <p className="text-sm sm:text-sm text-black/70 mt-1 leading-tight">
              {isInitiating ? "Initializing quest..." : "Click on Microphone to start conversation"}
            </p>
          </div>
          
          <div className="w-16 sm:w-32" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-amber-50 to-orange-100 -z-10"
      />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-4 sm:py-0">
        <motion.div
          className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <RadialCard 
            ref={radialRef} 
            assistantId={assistantId} 
            questTitle={questTitle}
            onCanScoreChange={setCanScore}
            onCountdownChange={(seconds, isActive) => {
              setSecondsLeft(seconds);
              setSessionActive(isActive);
            }}
            onInitiatingChange={setIsInitiating}
          />
        </motion.div>
      </div>

      {/* Bottom Countdown (mm:ss) */}
      {sessionActive && typeof secondsLeft === 'number' && secondsLeft >= 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
          <div className="px-5 py-2.5 rounded-xl bg-white/80 backdrop-blur border border-black/10 shadow-lg">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black tabular-nums">
              {`${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`}
            </span>
          </div>
        </div>
      )}


          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConversationRoom;
