"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestCard from "../components/quest-card";
import ConversationRoom from "../components/conversation-room";
import { quests } from "../../lib/questdata";

interface Quest {
  title: string;
  assistantId: string;
  description: string;
  narrationAudioUrl: string;
  questCardImageUrl: string;
  scoringAlgorithmPrompt: string;
}

export default function Test() {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  const handleQuestSelect = (quest: Quest) => {
    setSelectedQuest(quest);
  };

  const handleBackToQuests = () => {
    setSelectedQuest(null);
  };

  return (
    <>
      {/* Background */}
      <div
        className="fixed top-0 w-full h-screen bg-gradient-to-br from-amber-50 to-orange-100 bg-center -z-10"
        // style={{
        //   backgroundImage:
        //     'url("https://xo8yz727kp.ufs.sh/f/FyQUTC66sKbc48PBPvHHWacf6vk90KYTnzGr4V8ug7NEwmqO")',
        // }}
      />  
      
      <AnimatePresence mode="wait">
        {!selectedQuest ? (
          <motion.main
            key="quest-selection"
            className="min-h-screen flex flex-col items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-4xl font-bold text-black mb-4">Choose Your Quest</h1>
              <p className="text-lg text-black">Select an AI assistant to start your adventure</p>
            </motion.div>

            {/* Quest Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
              {quests.map((quest, index) => (
                <motion.div
                  key={quest.assistantId}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <QuestCard
                    title={quest.title}
                    assistantId={quest.assistantId}
                    description={quest.description}
                    questCardImageUrl={quest.questCardImageUrl}
                    onClick={() => handleQuestSelect(quest)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.main>
        ) : (
          <motion.div
            key="conversation-room"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ConversationRoom
              questTitle={selectedQuest.title}
              assistantId={selectedQuest.assistantId}
              narrationAudioUrl={selectedQuest.narrationAudioUrl}
              onBack={handleBackToQuests}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}