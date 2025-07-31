import React from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, Brain } from 'lucide-react';

const StartScreen = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-900 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-md w-full"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <Brain className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold text-gray-100 mb-4"
        >
          Quiz Master
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-300 text-lg mb-8 leading-relaxed"
        >
          Test your knowledge with our engaging quiz! Answer multiple choice, multi-select, and fill-in-the-blank questions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center space-x-4 text-gray-400 text-sm mb-6">
            <div className="flex items-center space-x-1">
              <Trophy className="w-4 h-4" />
              <span>8 Questions</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <span>Mixed Difficulty</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-4 px-8 rounded-xl shadow-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>Start Quiz</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default StartScreen;
