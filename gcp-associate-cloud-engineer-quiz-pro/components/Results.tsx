
import React, { useState } from 'react';
import { QuizState, ExamSection } from '../types';

interface ResultsProps {
  quizState: QuizState;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ quizState, onRestart }) => {
  const [showReview, setShowReview] = useState(false);
  const { questions, userAnswers } = quizState;

  const correctCount = userAnswers.reduce((acc, ans, idx) => {
    return ans === questions[idx].correctAnswerIndex ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((correctCount / questions.length) * 100);
  const isPassed = percentage >= 70;

  // Break down by section
  const sectionStats = Object.values(ExamSection).map(section => {
    const sectionQs = questions.filter(q => q.section === section);
    const sectionCorrect = sectionQs.reduce((acc, q) => {
      const originalIdx = questions.indexOf(q);
      return userAnswers[originalIdx] === q.correctAnswerIndex ? acc + 1 : acc;
    }, 0);
    return {
      name: section,
      correct: sectionCorrect,
      total: sectionQs.length,
      percentage: sectionQs.length > 0 ? Math.round((sectionCorrect / sectionQs.length) * 100) : 0
    };
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Score Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center border border-slate-100 overflow-hidden relative">
          <div className={`absolute top-0 left-0 w-full h-2 ${isPassed ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Quiz Complete!</h2>
          <div className="mb-6">
            <span className={`text-8xl font-black ${isPassed ? 'text-green-500' : 'text-red-500'}`}>
              {percentage}%
            </span>
          </div>
          <p className="text-xl text-slate-600 mb-8 max-w-lg mx-auto">
            {isPassed 
              ? "Congratulations! You've demonstrated strong knowledge of the GCP Associate Cloud Engineer domains." 
              : "Not quite there yet. Keep studying the areas where you struggled and try again!"}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-left">
            {sectionStats.map(stat => (
              <div key={stat.name} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.name}</span>
                  <span className={`text-sm font-bold ${stat.percentage >= 70 ? 'text-green-600' : 'text-orange-600'}`}>{stat.percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${stat.percentage >= 70 ? 'bg-green-500' : 'bg-orange-500'}`} 
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
                <div className="mt-2 text-sm text-slate-500">{stat.correct} / {stat.total} Correct</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={onRestart}
              className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all active:scale-95"
            >
              Take Quiz Again
            </button>
            <button
              onClick={() => setShowReview(!showReview)}
              className="px-10 py-4 bg-white text-blue-600 border-2 border-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all active:scale-95"
            >
              {showReview ? 'Hide Review' : 'Review Answers'}
            </button>
          </div>
        </div>

        {/* Detailed Review Section */}
        {showReview && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-slate-800 px-2">Detailed Question Review</h3>
            {questions.map((q, idx) => {
              const isCorrect = userAnswers[idx] === q.correctAnswerIndex;
              return (
                <div key={q.id} className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
                  <div className={`p-4 flex items-center gap-3 ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                    {isCorrect ? (
                       <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    ) : (
                       <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                    )}
                    <span className={`font-bold text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      Question {idx + 1}: {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className="text-lg font-semibold text-slate-800">{q.text}</p>
                    <div className="grid gap-2">
                       {q.options.map((opt, oIdx) => (
                         <div 
                          key={oIdx} 
                          className={`p-3 rounded-lg text-sm flex justify-between items-center ${
                            oIdx === q.correctAnswerIndex 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : oIdx === userAnswers[idx] && !isCorrect
                                ? 'bg-red-100 text-red-800 border border-red-200'
                                : 'bg-slate-50 text-slate-500'
                          }`}
                         >
                           <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                           {oIdx === q.correctAnswerIndex && <span className="font-bold text-xs uppercase">Correct Answer</span>}
                           {oIdx === userAnswers[idx] && !isCorrect && <span className="font-bold text-xs uppercase">Your Choice</span>}
                         </div>
                       ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Explanation</h4>
                      <p className="text-slate-600 text-sm italic">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
