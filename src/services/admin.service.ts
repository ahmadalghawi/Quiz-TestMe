import api from './api';
import { Subject, Topic, Question } from '../types';

// Subjects
export const getSubjects = async () => {
  const response = await api.get('/subjects');
  return response.data.data.subjects;
};

export const createSubject = async (data: Omit<Subject, 'id' | 'topics'>) => {
  const response = await api.post('/subjects', data);
  return response.data.data.subject;
};

export const updateSubject = async (id: number, data: Partial<Subject>) => {
  const response = await api.put(`/subjects/${id}`, data);
  return response.data.data.subject;
};

export const deleteSubject = async (id: number) => {
  await api.delete(`/subjects/${id}`);
};

// Topics
export const getTopicsBySubject = async (subjectId: number) => {
  const response = await api.get(`/topics/${subjectId}`);
  return response.data.data.topics;
};

export const createTopic = async (data: Omit<Topic, 'id' | 'questions'> & { subjectId: number }) => {
  const response = await api.post('/topics', data);
  return response.data.data.topic;
};

export const updateTopic = async (id: number, data: Partial<Topic>) => {
  const response = await api.put(`/topics/${id}`, data);
  return response.data.data.topic;
};

export const deleteTopic = async (id: number) => {
  await api.delete(`/topics/${id}`);
};

// Questions
export const getQuestionsByTopic = async (topicId: number) => {
  const response = await api.get(`/questions/${topicId}`);
  return response.data.data.questions;
};

export const createQuestion = async (data: Omit<Question, 'id'> & { topicId: number }) => {
  const response = await api.post('/questions', data);
  return response.data.data.question;
};

export const updateQuestion = async (id: number, data: Partial<Question>) => {
  console.log("data",data);
  console.log("id",id);
  const response = await api.put(`/questions/${id}`, data);
  return response.data.data.question;
};

export const deleteQuestion = async (id: number) => {
  await api.delete(`/questions/${id}`);
};