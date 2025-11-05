export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export enum GameState {
  Splash = 'SPLASH',
  Welcome = 'WELCOME',
  Playing = 'PLAYING',
  Finished = 'FINISHED',
}