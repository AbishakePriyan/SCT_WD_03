import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { questions } from '../data/questions';

const QuizScreen = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      let totalScore = 0;
      questions.forEach(question => {
        const userAnswer = answers[question.id];
        const correctAnswer = question.correctAnswer;

        if (question.type === 'single' || question.type === 'fill') {
          if (typeof userAnswer === 'string' && typeof correctAnswer === 'string') {
            if (userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
              totalScore += question.points;
            }
          }
        } else if (question.type === 'multiple' && Array.isArray(correctAnswer)) {
          if (Array.isArray(userAnswer)) {
            const sortedUser = [...userAnswer].sort();
            const sortedCorrect = [...correctAnswer].sort();
            if (JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect)) {
              totalScore += question.points;
            }
          }
        }
      });

      onComplete(answers, totalScore);
    } else {
      setDirection(1);
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setDirection(-1);
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const renderQuestion = () => {
    const userAnswer = answers[currentQuestion.id];

    switch (currentQuestion.type) {
      case 'single':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <motion.label
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  userAnswer === option
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                  userAnswer === option ? 'border-yellow-400' : 'border-gray-500'
                }`}>
                  {userAnswer === option && (
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  )}
                </div>
                <span className="text-gray-200">{option}</span>
              </motion.label>
            ))}
          </div>
        );

      case 'multiple':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <motion.label
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  Array.isArray(userAnswer) && userAnswer.includes(option)
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                }`}
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={Array.isArray(userAnswer) && userAnswer.includes(option)}
                  onChange={(e) => {
                    const currentAnswers = Array.isArray(userAnswer) ? userAnswer : [];
                    if (e.target.checked) {
                      handleAnswer([...currentAnswers, option]);
                    } else {
                      handleAnswer(currentAnswers.filter(a => a !== option));
                    }
                  }}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                  Array.isArray(userAnswer) && userAnswer.includes(option) 
                    ? 'border-yellow-400 bg-yellow-400' 
                    : 'border-gray-500'
                }`}>
                  {Array.isArray(userAnswer) && userAnswer.includes(option) && (
                    <CheckCircle className="w-3 h-3 text-gray-900" />
                  )}
                </div>
                <span className="text-gray-200">{option}</span>
              </motion.label>
            ))}
          </div>
        );

      case 'fill':
        return (
          <div>
            <input
              type="text"
              value={userAnswer || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-4 bg-gray-800 border-2 border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors duration-200"
            />
          </div>
        );

      default:
        return null;
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-yellow-400 text-sm font-medium">
              {currentQuestion.points} point{currentQuestion.points !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-yellow-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestionIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="bg-gray-800 rounded-xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-100 mb-6 leading-relaxed">
              {currentQuestion.question}
            </h2>
            
            {renderQuestion()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <motion.button
            whileHover={{ scale: isFirstQuestion ? 1 : 1.05 }}
            whileTap={{ scale: isFirstQuestion ? 1 : 0.95 }}
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              isFirstQuestion
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors duration-200"
          >
            <span>{isLastQuestion ? 'Submit Quiz' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
