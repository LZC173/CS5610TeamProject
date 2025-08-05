
import type Question from "./Question"
export default interface EditQuestions {
  quizId: string | null;   
  deleteQuestionsIds: string[];
  updatedQuestions: Question[];   
  newQuestions: Question[];
}