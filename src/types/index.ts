export interface Subject {
  id: number;
  name: string;
  nameAr: string;
  imageUrl: string;
  topics: Topic[];
}

export interface Topic {
  id: number;
  name: string;
  nameAr: string;
  quizTime: number; // in seconds
  questions: Question[];
}

export interface Question {
  id: number;
  text: string;
  textAr: string;
  options: Option[];
  correctOptionId: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Option {
  id: string;
  text: string;
  textAr: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, string>;
  isComplete: boolean;
  startTime: number | null;
}