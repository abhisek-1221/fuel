"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import RadialCard from './radial-card';

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
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Quests</span>
          </motion.button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">{questTitle} Quest</h1>
            <p className="text-sm text-white/70 mt-1">AI Assistant Conversation</p>
          </div>
          
          <div className="w-32" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br ${getQuestColor(questTitle)} -z-10`}
      />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <RadialCard assistantId={assistantId} />
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 p-6">
        <div className="text-center">
          <p className="text-sm text-white/50">
            Tap the microphone to start your conversation with {questTitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ConversationRoom;
