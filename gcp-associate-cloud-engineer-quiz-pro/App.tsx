
import React, { useState, useEffect, useCallback } from 'react';
import { Question, QuizState } from './types';
import { ALL_QUESTIONS } from './constants';
import QuizCard from './components/QuizCard';
import Results from './components/Results';
import ProgressBar from './components/ProgressBar';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    isFinished: false,
  });

  const [hasStarted, setHasStarted] = useState(false);

  // Shuffle algorithm (Fisher-Yates)
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const startQuiz = useCallback(() => {
    // 1. Shuffle questions
    const shuffledQuestions = shuffleArray(ALL_QUESTIONS).map(q => ({
      ...q,
      // 2. Shuffle choices for each question
      options: shuffleArray(q.options.map((opt, idx) => ({ text: opt, originalIdx: idx })))
    }));

    // Re-map the correct index based on shuffled options
    const reMappedQuestions: Question[] = shuffledQuestions.map(q => {
      const originalCorrectText = ALL_QUESTIONS.find(oq => oq.id === q.id)!.options[ALL_QUESTIONS.find(oq => oq.id === q.id)!.correctAnswerIndex];
      const newCorrectIdx = q.options.findIndex(opt => opt.text === originalCorrectText);
      return {
        ...q,
        options: q.options.map(o => o.text),
        correctAnswerIndex: newCorrectIdx
      };
    });

    setQuizState({
      questions: reMappedQuestions,
      currentQuestionIndex: 0,
      userAnswers: new Array(reMappedQuestions.length).fill(null),
      isFinished: false,
    });
    setHasStarted(true);
  }, []);

  const handleAnswer = (answerIndex: number) => {
    const newUserAnswers = [...quizState.userAnswers];
    newUserAnswers[quizState.currentQuestionIndex] = answerIndex;

    setQuizState(prev => ({
      ...prev,
      userAnswers: newUserAnswers
    }));
  };

  const handleNext = () => {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      setQuizState(prev => ({
        ...prev,
        isFinished: true
      }));
    }
  };

  const handlePrev = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  const restart = () => {
    setHasStarted(false);
    setQuizState({
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: [],
      isFinished: false,
    });
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6 border border-slate-100">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">GCP Associate Cloud Engineer Quiz</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Test your knowledge across all 4 exam domains. Questions are randomized every session. 
            Aim for 70% or higher to match the passing threshold!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4">
             <div className="p-3 bg-blue-50 rounded-lg text-blue-700 font-semibold text-sm">~23% Setup</div>
             <div className="p-3 bg-green-50 rounded-lg text-green-700 font-semibold text-sm">~30% Plan</div>
             <div className="p-3 bg-orange-50 rounded-lg text-orange-700 font-semibold text-sm">~27% Ops</div>
             <div className="p-3 bg-purple-50 rounded-lg text-purple-700 font-semibold text-sm">~20% Security</div>
          </div>
          <button
            onClick={startQuiz}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg active:scale-95"
          >
            Start Certification Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizState.isFinished) {
    return (
      <Results 
        quizState={quizState} 
        onRestart={restart}
      />
    );
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full flex flex-col gap-6">
        
        <header className="flex justify-between items-center mb-2">
           <div>
             <h2 className="text-xl font-bold text-slate-800">ACE Practice Exam</h2>
             <p className="text-sm text-slate-500 font-medium">{currentQuestion.section}</p>
           </div>
           <div className="text-right">
             <span className="text-2xl font-bold text-blue-600">{quizState.currentQuestionIndex + 1}</span>
             <span className="text-slate-400 font-medium"> / {quizState.questions.length}</span>
           </div>
        </header>

        <ProgressBar 
          current={quizState.currentQuestionIndex + 1} 
          total={quizState.questions.length} 
        />

        <QuizCard
          question={currentQuestion}
          selectedAnswer={quizState.userAnswers[quizState.currentQuestionIndex]}
          onAnswer={handleAnswer}
        />

        <div className="flex justify-between items-center mt-4 sticky bottom-8">
          <button
            onClick={handlePrev}
            disabled={quizState.currentQuestionIndex === 0}
            className="px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 shadow-sm disabled:opacity-50 hover:bg-slate-50 transition-colors"
          >
            Previous
          </button>
          
          {quizState.userAnswers[quizState.currentQuestionIndex] !== null ? (
            <button
              onClick={handleNext}
              className="px-10 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95"
            >
              {quizState.currentQuestionIndex === quizState.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          ) : (
            <div className="text-slate-400 font-medium text-sm animate-pulse">Select an answer to continue</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
