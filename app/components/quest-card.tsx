"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { User, Utensils, UserCheck, Luggage } from 'lucide-react';

interface QuestCardProps {
  title: string;
  assistantId: string;
  description: string;
  onClick: () => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ title, assistantId, description, onClick }) => {
  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'girlfriend':
        return <User className="w-8 h-8 text-pink-500" />;
      case 'waiter':
        return <Utensils className="w-8 h-8 text-orange-500" />;
      case 'customer':
        return <UserCheck className="w-8 h-8 text-blue-500" />;
      case 'luggage':
        return <Luggage className="w-8 h-8 text-green-500" />;
      default:
        return <User className="w-8 h-8 text-gray-500" />;
    }
  };

  const getGradient = (title: string) => {
    switch (title.toLowerCase()) {
      case 'girlfriend':
        return 'from-pink-500/20 to-purple-500/20';
      case 'waiter':
        return 'from-orange-500/20 to-red-500/20';
      case 'customer':
        return 'from-blue-500/20 to-cyan-500/20';
      case 'luggage':
        return 'from-green-500/20 to-emerald-500/20';
      default:
        return 'from-gray-500/20 to-slate-500/20';
    }
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${getGradient(title)} backdrop-blur-sm p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-white/20`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm">
          {getIcon(title)}
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-sm text-white/70 leading-relaxed">{description}</p>
        </div>
        
        <div className="flex items-center justify-center w-full">
          <motion.button
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium text-white transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Quest
          </motion.button>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default QuestCard;
