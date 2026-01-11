import React, { useState, useEffect } from 'react';
import { AppStep, UserData, QuizState, SavedData } from './types';
import { QUESTIONS, QUESTIONS_PER_PAGE, LOCAL_STORAGE_KEY } from './constants';
import Welcome from './components/Welcome';
import UserDataForm from './components/UserDataForm';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [userData, setUserData] = useState<UserData>({ gender: '', age: '', status: '' });
  const [quizState, setQuizState] = useState<QuizState>({
    answers: {},
    currentQuestionIndex: 0,
  });

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed: SavedData = JSON.parse(saved);
        if (parsed.completed) {
          setUserData(parsed.userData);
          setQuizState(parsed.quizState);
          setStep(AppStep.RESULT);
        } else {
          // Restore progress if not finished, but maybe reset to User Data if empty
          if (parsed.userData.gender) {
            setUserData(parsed.userData);
            setQuizState(parsed.quizState);
            setStep(AppStep.QUIZ);
          }
        }
      } catch (e) {
        console.error("Failed to load save data", e);
      }
    }
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    const isCompleted = step === AppStep.RESULT;
    const dataToSave: SavedData = {
      userData,
      quizState,
      completed: isCompleted,
      timestamp: Date.now(),
    };
    
    // Only save if we have started entering data
    if (step !== AppStep.WELCOME) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [userData, quizState, step]);

  const handleStart = () => {
    setStep(AppStep.USER_DATA);
  };

  const handleUserDataSubmit = (data: UserData) => {
    setUserData(data);
    setStep(AppStep.QUIZ);
  };

  const handleAnswer = (questionId: number, score: number) => {
    setQuizState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: score },
    }));
  };

  const totalPages = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);
  const currentPage = Math.floor(quizState.currentQuestionIndex / QUESTIONS_PER_PAGE);

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage >= totalPages) {
      setStep(AppStep.RESULT);
    } else {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: nextPage * QUESTIONS_PER_PAGE,
      }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) {
      setStep(AppStep.USER_DATA);
    } else {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prevPage * QUESTIONS_PER_PAGE,
      }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setUserData({ gender: '', age: '', status: '' });
    setQuizState({ answers: {}, currentQuestionIndex: 0 });
    setStep(AppStep.WELCOME);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateTotalScore = () => {
    return Object.values(quizState.answers).reduce((a: number, b: number) => a + b, 0);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-textMain selection:bg-primary selection:text-white">
      <main className="container mx-auto max-w-3xl px-4 py-8 md:py-12">
        {step === AppStep.WELCOME && (
          <Welcome onStart={handleStart} />
        )}

        {step === AppStep.USER_DATA && (
          <div className="animate-fade-in-up">
            <UserDataForm initialData={userData} onSubmit={handleUserDataSubmit} />
          </div>
        )}

        {step === AppStep.QUIZ && (
          <div className="animate-fade-in-up">
            <Quiz 
              answers={quizState.answers}
              onAnswer={handleAnswer}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        )}

        {step === AppStep.RESULT && (
          <div className="animate-fade-in-up">
            <Result 
              score={calculateTotalScore()} 
              userData={userData} 
              onReset={handleReset} 
            />
          </div>
        )}
      </main>
      
      {/* Simple footer */}
      <footer className="text-center py-6 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Seberapa Red Flag. <br/>Dibuat untuk hiburan semata.
      </footer>
    </div>
  );
}

export default App;