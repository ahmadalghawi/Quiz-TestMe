import { create } from 'zustand';
import { Subject, Topic, QuizState } from '../types';
import * as quizService from '../services/quiz.service';

interface Store {
  subjects: Subject[];
  selectedSubject: Subject | null;
  selectedTopicId: number | null;
  quizState: QuizState;
  timeRemaining: number;
  loading: boolean;
  error: string | null;
  setSubjects: (subjects: Subject[]) => void;
  fetchSubjects: () => Promise<void>;
  selectSubject: (subject: Subject | null) => void;
  selectTopic: (topicId: number | null) => void;
  setAnswer: (questionId: number, optionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  updateTimer: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<Store>((set, get) => ({
  subjects: [],
  selectedSubject: null,
  selectedTopicId: null,
  quizState: {
    currentQuestionIndex: 0,
    answers: {},
    isComplete: false,
    startTime: null,
  },
  timeRemaining: 7200, // default time
  loading: false,
  error: null,

  setSubjects: (subjects) => set({ subjects }),

  fetchSubjects: async () => {
    try {
      set({ loading: true, error: null });
      const subjects = await quizService.getSubjects();
      set({ subjects, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch subjects',
      });
      throw error;
    }
  },

  selectSubject: (subject) => set({ 
    selectedSubject: subject, 
    selectedTopicId: null,
    timeRemaining: 7200,
  }),

  selectTopic: async (topicId) => {
    if (topicId === null) {
      set({ 
        selectedTopicId: null,
        quizState: {
          currentQuestionIndex: 0,
          answers: {},
          isComplete: false,
          startTime: null,
        },
        timeRemaining: 7200,
      });
      return;
    }

    try {
      set({ loading: true, error: null });
      const questions = await quizService.getQuestionsByTopic(topicId);
      const selectedSubject = get().selectedSubject;

      if (selectedSubject) {
        const selectedTopic = selectedSubject.topics.find(t => t.id === topicId);
        const updatedSubject = {
          ...selectedSubject,
          topics: selectedSubject.topics.map(topic =>
            topic.id === topicId ? { ...topic, questions } : topic
          ),
        };
        set({ 
          selectedSubject: updatedSubject,
          timeRemaining: selectedTopic?.quizTime || 7200,
        });
      }

      set({ 
        selectedTopicId: topicId,
        quizState: {
          currentQuestionIndex: 0,
          answers: {},
          isComplete: false,
          startTime: Date.now(),
        },
        loading: false,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch questions',
      });
      throw error;
    }
  },

  setAnswer: (questionId, optionId) =>
    set((state) => ({
      quizState: {
        ...state.quizState,
        answers: { ...state.quizState.answers, [questionId]: optionId },
      },
    })),

  nextQuestion: () =>
    set((state) => ({
      quizState: {
        ...state.quizState,
        currentQuestionIndex: state.quizState.currentQuestionIndex + 1,
      },
    })),

  previousQuestion: () =>
    set((state) => ({
      quizState: {
        ...state.quizState,
        currentQuestionIndex: Math.max(0, state.quizState.currentQuestionIndex - 1),
      },
    })),

  updateTimer: () =>
    set((state) => ({
      timeRemaining: Math.max(0, state.timeRemaining - 1),
    })),

  completeQuiz: () =>
    set((state) => ({
      quizState: { ...state.quizState, isComplete: true },
    })),

  resetQuiz: () =>
    set({
      quizState: {
        currentQuestionIndex: 0,
        answers: {},
        isComplete: false,
        startTime: Date.now(),
      },
      timeRemaining: 7200,
    }),
}));