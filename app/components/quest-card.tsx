"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import Image from 'next/image';

interface QuestCardProps {
  title: string;
  assistantId: string;
  description: string;
  questCardImageUrl: string;
  onClick: () => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ title, assistantId, description, questCardImageUrl, onClick }) => {
  const getAssistantText = (title: string) => {
    switch (title.toLowerCase()) {
      case 'girlfriend':
      case "forgot girlfriend's birthday":
        return 'Nova Flame — Express your burning desire';
      case 'waiter':
      case 'hr interview':
        return 'Bob — Your ally against office monotony';
      case 'customer':
      case 'veg customer':
        return 'Prodigy Paws — The smartest cat in school';
      case 'luggage':
      case 'lost luggage':
        return 'Bob — Your travel companion';
      default:
        return 'AI Assistant — Your companion';
    }
  };

  const assistantText = getAssistantText(title);

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden h-80 sm:h-[28rem] shadow-2xl cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={questCardImageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        width={800}
        height={448}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent from-black/60"></div>

      <div className="absolute bottom-4 left-4 right-4">
        <motion.button 
          className="w-full text-black font-semibold rounded-full bg-gradient-to-br from-yellow-50 via-amber-50 to-stone-200 px-6 py-3 text-center shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border-t border-white/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mic className="w-5 h-5" />
          {title}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuestCard;
