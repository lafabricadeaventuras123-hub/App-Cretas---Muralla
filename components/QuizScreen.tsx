import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { CheckIcon, CrossIcon } from './IconComponents';

interface QuizScreenProps {
  question: QuizQuestion;
  onAnswer: (selectedAnswer: string) => void;
  currentScore: number;
  requiredScore: number;
  questionNumber: number;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ question, onAnswer, currentScore, requiredScore, questionNumber }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    setSelectedOption(null);
    setFeedback(null);
  }, [question]);

  const handleOptionClick = (option: string) => {
    if (selectedOption) return;

    setSelectedOption(option);
    const isCorrect = option === question.correctAnswer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      onAnswer(option);
    }, 1500);
  };

  const getButtonClass = (option: string) => {
    if (!selectedOption) {
      return 'bg-stone-700 hover:bg-stone-600 border-stone-800';
    }
    const isCorrect = option === question.correctAnswer;
    const isSelected = option === selectedOption;

    if (isCorrect) {
      return 'bg-green-700 border-green-800 scale-105';
    }
    if (isSelected && !isCorrect) {
      return 'bg-red-800 border-red-900';
    }
    return 'bg-stone-800 border-stone-900 opacity-50 cursor-not-allowed';
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full mb-6">
        <div className="flex justify-between items-center text-amber-200 mb-2">
            <span className="text-lg">Pregunta {questionNumber}</span>
            <span className="text-lg font-bold">Puntuación: {currentScore} / {requiredScore}</span>
        </div>
        <div className="w-full bg-stone-900/50 rounded-full h-4 border-2 border-stone-700">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${(currentScore / requiredScore) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-stone-200 leading-relaxed">{question.question}</h2>

      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={!!selectedOption}
            className={`flex items-center justify-between text-left w-full text-white font-semibold py-4 px-6 rounded-lg text-lg transition-all duration-300 border-2 shadow-md shadow-black/30 ${getButtonClass(option)}`}
          >
            <span>{option}</span>
            {selectedOption && option === question.correctAnswer && <CheckIcon />}
            {selectedOption && option === selectedOption && option !== question.correctAnswer && <CrossIcon />}
          </button>
        ))}
      </div>
      
      {feedback && (
         <p className={`mt-6 text-2xl font-bold animate-pulse ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
            {feedback === 'correct' ? '¡Correcto!' : '¡Incorrecto!'}
         </p>
      )}

    </div>
  );
};

export default QuizScreen;