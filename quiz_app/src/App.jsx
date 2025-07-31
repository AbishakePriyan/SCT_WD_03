import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { quizQuestions } from './data/questions';

function App() {
  const [gameState, setGameState] = useState('start');
  const [results, setResults] = useState(null);

  const totalPoints = quizQuestions.reduce((sum, question) => sum + question.points, 0);

  const handleStartQuiz = () => {
    setGameState('quiz');
    setResults(null);
  };

  const handleQuizComplete = (answers, score) => {
    setResults({ answers, score });
    setGameState('results');
  };

  const handleRetakeQuiz = () => {
    setGameState('start');
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <StartScreen key="start" onStart={handleStartQuiz} />
        )}

        {gameState === 'quiz' && (
          <QuizScreen
            key="quiz"
            questions={quizQuestions}
            onComplete={handleQuizComplete}
          />
        )}

        {gameState === 'results' && results && (
          <ResultScreen
            key="results"
            score={results.score}
            totalQuestions={quizQuestions.length}
            totalPoints={totalPoints}
            onRetake={handleRetakeQuiz}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
