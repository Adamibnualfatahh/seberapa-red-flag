export enum AppStep {
  WELCOME = 'WELCOME',
  USER_DATA = 'USER_DATA',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT',
}

export enum Gender {
  MALE = 'Pria',
  FEMALE = 'Wanita',
  NON_BINARY = 'Non-biner',
}

export enum RelationshipStatus {
  SINGLE = 'Single',
  DATING = 'Pacaran',
  EX_DATING = 'Pernah Pacaran',
  MARRIED = 'Menikah',
}

export interface UserData {
  gender: Gender | '';
  age: string;
  status: RelationshipStatus | '';
}

export interface Question {
  id: number;
  text: string;
  category: string;
  weight: number; // 1-3, heavy questions weigh more
  applicableGender?: Gender[]; // If undefined, applicable to all
  applicableStatus?: RelationshipStatus[]; // If undefined, applicable to all
  minAge?: number;
}

export interface Solution {
  category: string;
  scoreRange: [number, number]; // e.g. [0, 1] (low risk), [2, 3] (high risk) - average score per category
  title: string;
  description: string;
  advice: string[];
}

export interface QuizState {
  answers: Record<number, number>; // questionId -> score (0-3)
  currentQuestionIndex: number;
}

export interface SavedData {
  userData: UserData;
  quizState: QuizState;
  completed: boolean;
  timestamp: number;
}