"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, User } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
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
  const [userPoints, setUserPoints] = useState<number>(0);
  const [pointsLoading, setPointsLoading] = useState(true);

  // Fetch user points
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await fetch('/api/user/points');
        if (response.ok) {
          const data = await response.json();
          setUserPoints(data.totalPoints);
        }
      } catch (error) {
        console.error('Error fetching points:', error);
      } finally {
        setPointsLoading(false);
      }
    };

    fetchPoints();
  }, []);

  const handleQuestSelect = (quest: Quest) => {
    setSelectedQuest(quest);
  };

  const handleBackToQuests = () => {
    setSelectedQuest(null);
  };

  const refreshPoints = async () => {
    try {
      const response = await fetch('/api/user/points');
      if (response.ok) {
        const data = await response.json();
        setUserPoints(data.totalPoints);
      }
    } catch (error) {
      console.error('Error refreshing points:', error);
    }
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
      
      {/* Top Navigation - only show when no quest is selected */}
      {!selectedQuest && (
        <div className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center p-6">
        <div></div> {/* Spacer */}
        <div className="flex items-center gap-4">
          {/* Points Display */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: `linear-gradient(135deg, rgb(245, 235, 220) 0%, rgb(232, 218, 196) 50%, rgb(218, 200, 170) 100%)`,
              boxShadow: `
                0 8px 20px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(255, 255, 255, 0.3) inset,
                0 2px 4px 0 rgba(255, 255, 255, 0.4) inset
              `,
            }}
          >
            <Coins className="w-5 h-5 text-amber-600" />
            <span className="font-bold text-amber-900">
              {pointsLoading ? "..." : userPoints.toLocaleString()}
            </span>
          </motion.div>
          
          {/* User Button */}
          <div className="rounded-full overflow-hidden shadow-lg">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        </div>
      )}
      
      <AnimatePresence mode="wait">
        {!selectedQuest ? (
          <motion.main
            key="quest-selection"
            className="min-h-screen flex flex-col items-center justify-center p-6 pt-20"
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
              onScoreCalculated={refreshPoints}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}