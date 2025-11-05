import React, { useState, useCallback } from 'react';
import { QuizQuestion, GameState } from './types';
import { generateQuizQuestions } from './services/geminiService';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import VictoryScreen from './components/VictoryScreen';
import LoadingSpinner from './components/LoadingSpinner';
import SplashScreen from './components/SplashScreen';

const BACKGROUND_IMAGE_URL = 'https://storage.googleapis.com/generative-ai-vision/user-assets/e699291f-a185-423c-82e7-8f78117c7688.jpg';
const REQUIRED_SCORE = 5;

export default function App(): React.ReactElement {
  const [gameState, setGameState] = useState<GameState>(GameState.Splash);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startGame = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedQuestions = await generateQuizQuestions();
      if (fetchedQuestions.length < REQUIRED_SCORE) {
        throw new Error("Not enough questions generated. Please try again.");
      }
      setQuestions(fetchedQuestions);
      setScore(0);
      setCurrentQuestionIndex(0);
      setGameState(GameState.Playing);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      setGameState(GameState.Welcome);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAnswer = (selectedAnswer: string) => {
    const isCorrect = questions[currentQuestionIndex].correctAnswer === selectedAnswer;
    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore >= REQUIRED_SCORE) {
        setGameState(GameState.Finished);
      } else {
        moveToNextQuestion();
      }
    } else {
      // For this game, we just move on. Could add a penalty later.
      moveToNextQuestion();
    }
  };
  
  const moveToNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // This case should ideally not be hit if score logic is correct, but as a fallback:
      setGameState(GameState.Finished);
    }
  };

  const renderGameContent = () => {
    if (isLoading) {
      return <LoadingSpinner message="El centinela está preparando tu desafío..." />;
    }

    switch (gameState) {
      case GameState.Playing:
        return (
          <QuizScreen
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            currentScore={score}
            requiredScore={REQUIRED_SCORE}
            questionNumber={currentQuestionIndex + 1}
          />
        );
      case GameState.Finished:
        return <VictoryScreen />;
      case GameState.Welcome:
      default:
        return <WelcomeScreen onStart={startGame} error={error} />;
    }
  };

  return (
    <main
      className="relative bg-cover bg-center min-h-screen w-full flex flex-col items-center justify-center p-4"
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
    >
      {gameState === GameState.Splash ? (
        <SplashScreen onFinish={() => setGameState(GameState.Welcome)} />
      ) : (
        <>
          <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />
          <div className="relative z-10 w-full max-w-2xl min-h-[500px] bg-black bg-opacity-70 border-4 border-amber-800/50 shadow-2xl shadow-black rounded-lg text-white p-6 md:p-10 flex flex-col items-center justify-center text-center animate-fade-in">
            {renderGameContent()}
          </div>
        </>
      )}
    </main>
  );
}