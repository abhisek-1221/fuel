"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import Image from 'next/image';

interface QuestCardProps {
  title: string;
  assistantId: string;
  description: string;
  onClick: () => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ title, assistantId, description, onClick }) => {
  const getImageAndText = (title: string) => {
    switch (title.toLowerCase()) {
      case 'girlfriend':
        return {
          src: 'https://xo8yz727kp.ufs.sh/f/FyQUTC66sKbcJ2l1TpGqxZr2j6RGhIKykf0dLS49gePNvWAs',
          text: 'Nova Flame — Express your burning desire'
        };
      case 'waiter':
        return {
          src: 'https://pbs.twimg.com/media/GvReA8SagAAnbeJ?format=jpg&name=large',
          text: 'Bob — Your ally against office monotony'
        };
      case 'customer':
        return {
          src: 'https://pbs.twimg.com/media/GvQpuoBXAAAupU-?format=jpg&name=medium',
          text: 'Prodigy Paws — The smartest cat in school'
        };
      case 'luggage':
        return {
          src: 'https://pbs.twimg.com/media/GvReA8SagAAnbeJ?format=jpg&name=large',
          text: 'Bob — Your travel companion'
        };
      default:
        return {
          src: 'https://xo8yz727kp.ufs.sh/f/FyQUTC66sKbcJ2l1TpGqxZr2j6RGhIKykf0dLS49gePNvWAs',
          text: 'Nova Flame — Express your burning desire'
        };
    }
  };

  const imageData = getImageAndText(title);

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
        src={imageData.src}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        width={800}
        height={448}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent from-black/60"></div>
      
      <div className="absolute top-4 left-4 text-white">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-white/80 mt-1">{description}</p>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <motion.button 
          className="w-full text-black font-semibold rounded-full bg-gradient-to-br from-yellow-50 via-amber-50 to-stone-200 px-6 py-3 text-center shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border-t border-white/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mic className="w-5 h-5" />
          Start {title} Quest
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuestCard;
