export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface ModuleData {
  id: number;
  title: string;
  subtitle: string;
  problemLabel: string;
  problem: string;
  benefit: string;
  action: string;
  progress: number;
  locked: boolean;
  questions: Question[];
}

export interface QuizState {
  isOpen: boolean;
  currentQuestionIndex: number;
  selectedOption: number | null;
  isCorrect: boolean | null;
  isCompleted: boolean;
}

export type ViewMode = 'split' | 'dark' | 'light';

export interface ThemeContextProps {
  theme: 'dark' | 'light';
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  modules: ModuleData[];
  quizState: QuizState;
  quizActions: {
    openQuiz: () => void;
    closeQuiz: () => void;
    selectOption: (index: number) => void;
    submitAnswer: () => void;
    nextQuestion: () => void;
  };
  typingGameActions: {
    openGame: () => void;
    closeGame: () => void;
  };
}