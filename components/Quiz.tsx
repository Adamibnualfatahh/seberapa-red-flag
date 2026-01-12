import React from 'react';
import { QUESTIONS_PER_PAGE } from '../constants';
import { Question } from '../types';
import Button from './Button';

interface QuizProps {
  questions: Question[];
  answers: Record<number, number>;
  onAnswer: (questionId: number, score: number) => void;
  onNext: () => void;
  onPrev: () => void;
  currentPage: number;
  totalPages: number;
}

const Quiz: React.FC<QuizProps> = ({
  questions,
  answers,
  onAnswer,
  onNext,
  onPrev,
  currentPage,
  totalPages
}) => {
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  const allCurrentAnswered = currentQuestions.every((q) => answers[q.id] !== undefined);

  // Progress percentage
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  const renderOption = (questionId: number, score: number, label: string) => {
    const isSelected = answers[questionId] === score;
    return (
      <button
        onClick={() => onAnswer(questionId, score)}
        className={`flex-1 py-2 px-3 text-sm md:text-base rounded-lg border transition-all duration-200 ${isSelected
            ? 'bg-primary text-white border-primary shadow-md ring-2 ring-primary/30'
            : 'bg-white text-textMain border-gray-200 hover:border-secondary hover:text-secondary'
          }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header & Progress */}
      <div className="sticky top-0 bg-background pt-4 pb-2 z-10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-textSub">Halaman {currentPage + 1} dari {totalPages}</span>
          <span className="text-sm font-bold text-primary">{progress}% Selesai</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {currentQuestions.map((q) => (
          <div key={q.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="mb-4">
              <span className="text-xs font-bold tracking-wider text-secondary uppercase bg-orange-50 px-2 py-1 rounded-md">
                {q.category}
              </span>
              <h3 className="text-lg font-medium mt-2 leading-relaxed">{q.text}</h3>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-4">
              {renderOption(q.id, 0, 'Tidak Pernah')}
              {renderOption(q.id, 1, 'Kadang')}
              {renderOption(q.id, 2, 'Sering')}
              {renderOption(q.id, 3, 'Selalu')}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 pb-12 gap-4">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={currentPage === 0}
          className="flex-1"
        >
          Sebelumnya
        </Button>
        <Button
          onClick={onNext}
          disabled={!allCurrentAnswered}
          className="flex-1"
        >
          {currentPage === totalPages - 1 ? 'Lihat Hasil' : 'Berikutnya'}
        </Button>
      </div>
    </div>
  );
};

export default Quiz;