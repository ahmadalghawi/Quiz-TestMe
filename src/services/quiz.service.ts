import api from './api';
import { Subject, Topic, Question } from '../types';

export const getSubjects = async () => {
  const response = await api.get('/subjects');
  return response.data.data.subjects;
};

export const getTopicsBySubject = async (subjectId: number) => {
  const response = await api.get(`/topics/${subjectId}`);
  return response.data.data.topics;
};

export const getQuestionsByTopic = async (topicId: number) => {
  const response = await api.get(`/questions/${topicId}`);
  return response.data.data.questions;
};