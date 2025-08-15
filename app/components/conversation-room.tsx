"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import RadialCard, { RadialCardHandle } from './radial-card';
import { GradientButton } from './gradientbut';

interface ConversationRoomProps {
  questTitle: string;
  assistantId: string;
  onBack: () => void;
}

const ConversationRoom: React.FC<ConversationRoomProps> = ({ 
  questTitle, 
  assistantId, 
  onBack 
}) => {
  const radialRef = React.useRef<RadialCardHandle | null>(null);
  const [canScore, setCanScore] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState<number | null>(null);
  const [sessionActive, setSessionActive] = React.useState(false);
  const getQuestColor = (title: string) => {
    switch (title.toLowerCase()) {
      case 'girlfriend':
        return 'from-pink-500/10 to-purple-500/10';
      case 'waiter':
        return 'from-orange-500/10 to-red-500/10';
      case 'customer':
        return 'from-blue-500/10 to-cyan-500/10';
      case 'luggage':
        return 'from-green-500/10 to-emerald-500/10';
      default:
        return 'from-gray-500/10 to-slate-500/10';
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="relative z-10 p-4 sm:p-6">
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
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{questTitle} Quest</h1>
            <p className="text-xs sm:text-sm text-white/70 mt-1">AI Assistant Conversation</p>
          </div>
          
          <div className="w-16 sm:w-32" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br ${getQuestColor(questTitle)} -z-10`}
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
          />
        </motion.div>
      </div>

      {/* Centered Countdown */}
      {sessionActive && secondsLeft !== null && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-20 w-48 sm:w-64">
          <div className="px-4 py-2 rounded-xl bg-[#e6d5c1] border border-amber-900/20 shadow-lg flex items-baseline justify-center">
            <span className="text-4xl sm:text-5xl font-bold tracking-tight text-amber-900 leading-none">{secondsLeft}</span>
            <span className="ml-2 text-amber-800/80 text-lg sm:text-xl leading-none">s</span>
          </div>
          <div className="mt-2 h-1 rounded-full overflow-hidden bg-amber-900/10">
            <div
              className="h-full bg-amber-800/60 transition-[width] duration-1000 ease-linear"
              style={{ width: `${Math.max(0, Math.min(100, (secondsLeft / 10) * 100))}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="relative z-10 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <p className="text-xs sm:text-sm text-white/70 text-center sm:text-left order-2 sm:order-1">
            Tap the microphone to start your conversation
          </p>
          <div className="order-1 sm:order-2">
            <GradientButton
              onClick={() => radialRef.current?.requestScore()}
              disabled={!canScore}
              variant="beige"
              size="md"
              text="Show Score"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ConversationRoom;
