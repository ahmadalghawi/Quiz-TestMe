import React, { useState, useEffect } from 'react';
import { Plus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useAdminStore } from '../store/adminStore';
import { Subject, Topic, Question } from '../types';
import { SubjectForm } from '../components/admin/SubjectForm';
import { TopicForm } from '../components/admin/TopicForm';
import { QuestionForm } from '../components/admin/QuestionForm';
import { SubjectList } from '../components/admin/SubjectList';
import { TopicList } from '../components/admin/TopicList';
import { QuestionList } from '../components/admin/QuestionList';
import { ThemeToggle } from '../components/ThemeToggle';
import { Logo } from '../components/Logo';

export const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const {
    subjects,
    loading,
    fetchSubjects,
    createSubject,
    updateSubject,
    deleteSubject,
    createTopic,
    updateTopic,
    deleteTopic,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  } = useAdminStore();

  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  useEffect(() => {
    fetchSubjects().catch(console.error);
  }, [fetchSubjects]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubjectSubmit = async (data: Omit<Subject, 'id' | 'topics'>) => {
    try {
      if (editingSubject) {
        await updateSubject(editingSubject.id, data);
      } else {
        await createSubject(data);
      }
      setShowSubjectForm(false);
      setEditingSubject(null);
      await fetchSubjects();
    } catch (error) {
      console.error('Failed to save subject:', error);
    }
  };

  const handleTopicSubmit = async (data: Omit<Topic, 'id' | 'questions'>) => {
    if (!selectedSubject) return;

    try {
      if (editingTopic) {
        await updateTopic(editingTopic.id, data);
      } else {
        await createTopic(selectedSubject.id, data);
      }
      setShowTopicForm(false);
      setEditingTopic(null);
      await fetchSubjects();
    } catch (error) {
      console.error('Failed to save topic:', error);
    }
  };

  const handleQuestionSubmit = async (data: Omit<Question, 'id'>) => {
    if (!selectedTopic) return;
    console.log("selectedTopic",selectedTopic);
    console.log("data",data);
    try {
      if (editingQuestion) {
        await updateQuestion(editingQuestion.id, data);
      } else {
        await createQuestion(selectedTopic.id, data);
      }
      setShowQuestionForm(false);
      setEditingQuestion(null);
      await fetchSubjects();
    } catch (error) {
      console.error('Failed to save question:', error);
    }
  };

  const handleDeleteTopic = async (id: string) => {
    try {
      await deleteTopic(id);
      if (selectedTopic?.id === id) {
        setSelectedTopic(null);
      }
      await fetchSubjects();
    } catch (error) {
      console.error('Failed to delete topic:', error);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    try {
      await deleteQuestion(id);
      await fetchSubjects();
    } catch (error) {
      console.error('Failed to delete question:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-100 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-100">
      {/* Header */}
      <header className="bg-white dark:bg-dark-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-300 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-400"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Subjects Panel */}
          <div className="bg-white dark:bg-dark-200 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Subjects
                </h2>
                <button
                  onClick={() => {
                    setEditingSubject(null);
                    setShowSubjectForm(true);
                  }}
                  className="inline-flex items-center p-2 border border-transparent rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <SubjectList
                subjects={subjects}
                selectedSubject={selectedSubject}
                onSelectSubject={setSelectedSubject}
                onEditSubject={(subject) => {
                  setEditingSubject(subject);
                  setShowSubjectForm(true);
                }}
                onDeleteSubject={async (id) => {
                  try {
                    await deleteSubject(id);
                    if (selectedSubject?.id === id) {
                      setSelectedSubject(null);
                    }
                    await fetchSubjects();
                  } catch (error) {
                    console.error('Failed to delete subject:', error);
                  }
                }}
              />
            </div>
          </div>

          {/* Topics Panel */}
          <div className="bg-white dark:bg-dark-200 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Topics
                </h2>
                {selectedSubject && (
                  <button
                    onClick={() => {
                      setEditingTopic(null);
                      setShowTopicForm(true);
                    }}
                    className="inline-flex items-center p-2 border border-transparent rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                )}
              </div>
              {selectedSubject ? (
                <TopicList
                  topics={selectedSubject.topics}
                  selectedTopic={selectedTopic}
                  onSelectTopic={setSelectedTopic}
                  onEditTopic={(topic) => {
                    setEditingTopic(topic);
                    setShowTopicForm(true);
                  }}
                  onDeleteTopic={handleDeleteTopic}
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Select a subject to view topics
                </p>
              )}
            </div>
          </div>

          {/* Questions Panel */}
          <div className="bg-white dark:bg-dark-200 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Questions
                </h2>
                {selectedTopic && (
                  <button
                    onClick={() => {
                      setEditingQuestion(null);
                      setShowQuestionForm(true);
                    }}
                    className="inline-flex items-center p-2 border border-transparent rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                )}
              </div>
              {selectedTopic ? (
                <QuestionList
                  questions={selectedTopic.questions}
                  onEditQuestion={(question) => {
                    setEditingQuestion(question);
                    setShowQuestionForm(true);
                  }}
                  onDeleteQuestion={handleDeleteQuestion}
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Select a topic to view questions
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Forms */}
      {showSubjectForm && (
        <SubjectForm
          initialData={editingSubject || undefined}
          onSubmit={handleSubjectSubmit}
          onCancel={() => {
            setShowSubjectForm(false);
            setEditingSubject(null);
          }}
        />
      )}

      {showTopicForm && (
        <TopicForm
          initialData={editingTopic || undefined}
          onSubmit={handleTopicSubmit}
          onCancel={() => {
            setShowTopicForm(false);
            setEditingTopic(null);
          }}
        />
      )}

      {showQuestionForm && (
        <QuestionForm
          initialData={editingQuestion || undefined}
          onSubmit={handleQuestionSubmit}
          onCancel={() => {
            setShowQuestionForm(false);
            setEditingQuestion(null);
          }}
        />
      )}
    </div>
  );
};