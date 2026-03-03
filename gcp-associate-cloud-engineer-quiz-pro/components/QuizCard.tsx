
import React from 'react';
import { Question } from '../types';

interface QuizCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, selectedAnswer, onAnswer }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 transition-all duration-300">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-slate-900 leading-tight">
          {question.text}
        </h3>
      </div>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 group ${
              selectedAnswer === index
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors ${
              selectedAnswer === index
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'border-slate-200 text-slate-400 group-hover:border-blue-300 group-hover:text-blue-500'
            }`}>
              {String.fromCharCode(65 + index)}
            </div>
            <span className={`text-lg font-medium ${
              selectedAnswer === index ? 'text-blue-900' : 'text-slate-700'
            }`}>
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
