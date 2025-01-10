import { create } from 'zustand';
import { Subject, Topic, Question } from '../types';
import * as adminService from '../services/admin.service';

interface AdminStore {
  subjects: Subject[];
  loading: boolean;
  error: string | null;
  fetchSubjects: () => Promise<void>;
  createSubject: (data: Omit<Subject, 'id' | 'topics'>) => Promise<void>;
  updateSubject: (id: number, data: Partial<Subject>) => Promise<void>;
  deleteSubject: (id: number) => Promise<void>;
  createTopic: (subjectId: number, data: Omit<Topic, 'id' | 'questions'>) => Promise<void>;
  updateTopic: (id: number, data: Partial<Topic>) => Promise<void>;
  deleteTopic: (id: number) => Promise<void>;
  createQuestion: (topicId: number, data: Omit<Question, 'id'>) => Promise<void>;
  updateQuestion: (id: number, data: Partial<Question>) => Promise<void>;
  deleteQuestion: (id: number) => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set) => ({
  subjects: [],
  loading: false,
  error: null,

  fetchSubjects: async () => {
    try {
      set({ loading: true, error: null });
      const subjects = await adminService.getSubjects();
      set({ subjects, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch subjects',
      });
      throw error;
    }
  },

  createSubject: async (data) => {
    try {
      set({ loading: true, error: null });
      const subject = await adminService.createSubject(data);
      set((state) => ({
        subjects: [...state.subjects, subject],
        loading: false,
      }));
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to create subject',
      });
      throw error;
    }
  },

  updateSubject: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const updatedSubject = await adminService.updateSubject(id, data);
      set((state) => ({
        subjects: state.subjects.map((subject) =>
          subject.id === id ? { ...subject, ...updatedSubject } : subject
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to update subject',
      });
      throw error;
    }
  },

  deleteSubject: async (id) => {
    try {
      set({ loading: true, error: null });
      await adminService.deleteSubject(id);
      set((state) => ({
        subjects: state.subjects.filter((subject) => subject.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to delete subject',
      });
      throw error;
    }
  },

  createTopic: async (subjectId, data) => {
    try {
      set({ loading: true, error: null });
      const topic = await adminService.createTopic({ ...data, subjectId });
      set((state) => ({
        subjects: state.subjects.map((subject) =>
          subject.id === subjectId
            ? { ...subject, topics: [...subject.topics, topic] }
            : subject
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to create topic',
      });
      throw error;
    }
  },

  updateTopic: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const updatedTopic = await adminService.updateTopic(id, data);
      set((state) => ({
        subjects: state.subjects.map((subject) => ({
          ...subject,
          topics: subject.topics.map((topic) =>
            topic.id === id ? { ...topic, ...updatedTopic } : topic
          ),
        })),
        loading: false,
      }));
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to update topic',
      });
      throw error;
    }
  },

  deleteTopic: async (id) => {
    try {
      set({ loading: true, error: null });
      await adminService.deleteTopic(id);
      set((state) => ({
        subjects: state.subjects.map((subject) => ({
          ...subject,
          topics: subject.topics.filter((topic) => topic.id !== id),
        })),
        loading: false,
      }));
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to delete topic',
      });
      throw error;
    }
  },

  createQuestion: async (topicId, data) => {
    try {
      set({ loading: true, error: null });
      const question = await adminService.createQuestion({ ...data, topicId });
      set((state) => ({
        subjects: state.subjects.map((subject) => ({
          ...subject,
          topics: subject.topics.map((topic) =>
            topic.id === topicId
              ? { ...topic, questions: [...topic.questions, question] }
              : topic
          ),
        })),
        loading: false,
      }));
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to create question',
      });
      throw error;
    }
  },

  updateQuestion: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const updatedQuestion = await adminService.updateQuestion(id, data);
      set((state) => ({
        subjects: state.subjects.map((subject) => ({
          ...subject,
          topics: subject.topics.map((topic) => ({
            ...topic,
            questions: topic.questions.map((question) =>
              question.id === id ? { ...question, ...updatedQuestion } : question
            ),
          })),
        })),
        loading: false,
      }));
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to update question',
      });
      throw error;
    }
  },

  deleteQuestion: async (id) => {
    try {
      set({ loading: true, error: null });
      await adminService.deleteQuestion(id);
      set((state) => ({
        subjects: state.subjects.map((subject) => ({
          ...subject,
          topics: subject.topics.map((topic) => ({
            ...topic,
            questions: topic.questions.filter((q) => q.id !== id),
          })),
        })),
        loading: false,
      }));
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Failed to delete question',
      });
      throw error;
    }
  },
}));