import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Star, Target } from 'lucide-react';

const ResultScreen = ({ score, totalQuestions, totalPoints, onRetake }) => {
  const percentage = Math.round((score / totalPoints) * 100);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Outstanding!", icon: Trophy, color: "text-yellow-400" };
    if (percentage >= 70) return { message: "Great job!", icon: Star, color: "text-green-400" };
    if (percentage >= 50) return { message: "Good effort!", icon: Target, color: "text-blue-400" };
    return { message: "Keep practicing!", icon: Target, color: "text-orange-400" };
  };

  const performance = getPerformanceMessage();
  const PerformanceIcon = performance.icon;

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
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="mb-8"
        >
          <div className="relative">
            <PerformanceIcon className={`w-24 h-24 ${performance.color} mx-auto`} />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
            >
              <span className="text-gray-900 font-bold text-sm">✓</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl font-bold text-gray-100 mb-2"
        >
          Quiz Complete!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className={`text-xl font-semibold mb-8 ${performance.color}`}
        >
          {performance.message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gray-800 rounded-2xl p-8 mb-8 shadow-2xl"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="text-4xl font-bold text-yellow-400 mb-2"
              >
                {score}
              </motion.div>
              <div className="text-gray-400 text-sm">Points Earned</div>
            </div>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="text-4xl font-bold text-gray-300 mb-2"
              >
                {totalPoints}
              </motion.div>
              <div className="text-gray-400 text-sm">Total Points</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-600">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="text-3xl font-bold text-white mb-2"
              >
                {percentage}%
              </motion.div>
              <div className="text-gray-400 text-sm">Accuracy</div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-6"
          >
            <div className="w-full bg-gray-700 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetake}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-4 px-8 rounded-xl shadow-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Retake Quiz</span>
          </motion.button>

          <div className="text-gray-400 text-sm">
            Challenge yourself again and improve your score!
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ResultScreen;
