import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import { useAuthStore } from '../store/authStore';
import { SubjectCard } from '../components/SubjectCard';
import { TopicList } from '../components/TopicList';
import { QuizQuestion } from '../components/QuizQuestion';
import { QuizResults } from '../components/QuizResults';
import { ThemeToggle } from '../components/ThemeToggle';
import { LogOut, Loader2 } from 'lucide-react';

export const QuizApp: React.FC = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const {
    subjects,
    selectedSubject,
    selectedTopicId,
    quizState,
    timeRemaining,
    loading,
    error,
    fetchSubjects,
    selectSubject,
    selectTopic,
    setAnswer,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    resetQuiz,
  } = useQuizStore();

  useEffect(() => {
    fetchSubjects().catch(console.error);
  }, [fetchSubjects]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const selectedTopic = selectedSubject?.topics.find(
    (topic) => topic.id === selectedTopicId
  );

  const currentQuestion = selectedTopic?.questions[quizState.currentQuestionIndex];

  const handleExitQuiz = () => {
    resetQuiz();
    selectTopic(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-100 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-100 flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  if (quizState.isComplete && selectedTopic) {
    return (
      <div className="min-h-screen bg-[#85A7C7] py-8">
        <QuizResults
          questions={selectedTopic.questions}
          answers={quizState.answers}
          onRetry={() => {
            resetQuiz();
            selectTopic(selectedTopic.id);
          }}
          onBack={() => {
            resetQuiz();
            selectTopic(null);
          }}
        />
      </div>
    );
  }

  if (currentQuestion) {
    return (
      <div className="min-h-screen bg-[#85A7C7]">
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
        <QuizQuestion
          question={currentQuestion}
          selectedAnswer={quizState.answers[currentQuestion.id]}
          onAnswer={(optionId) => setAnswer(currentQuestion.id, optionId)}
          onNext={nextQuestion}
          onPrevious={previousQuestion}
          currentQuestionNumber={quizState.currentQuestionIndex + 1}
          totalQuestions={selectedTopic?.questions.length || 0}
          timeRemaining={timeRemaining}
          canNavigatePrevious={quizState.currentQuestionIndex > 0}
          onFinish={completeQuiz}
          onExit={handleExitQuiz}
          onTimeExpired={completeQuiz}
        />
      </div>
    );
  }

  if (selectedSubject) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-100">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => selectSubject(null)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to Subjects
            </button>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-200 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-300"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {selectedSubject.name}
          </h2>
          <h3 className="text-xl text-gray-600 dark:text-gray-400 font-arabic mb-8">
            {selectedSubject.nameAr}
          </h3>
          <TopicList
            topics={selectedSubject.topics}
            onSelect={(topicId) => selectTopic(topicId)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-100">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Select a Subject 
          </h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-200 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-300"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onClick={(subject) => selectSubject(subject)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};