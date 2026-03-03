
export enum ExamSection {
  SETUP = "Setting up a cloud solution environment",
  PLANNING = "Planning and implementing a cloud solution",
  OPERATION = "Ensuring successful operation of a cloud solution",
  SECURITY = "Configuring access and security"
}

export interface Question {
  id: string;
  section: ExamSection;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  isFinished: boolean;
}
