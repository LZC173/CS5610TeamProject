import type {QuestionDetails} from "./QuestionDetails.ts";

export default interface QuizDetails {
    courseId: string,
    quizId?: string,
    details: {
        dates: {
            availableFrom: string,
            availableUntil: string,
            dueDate: string
        },
        description: string,
        noOfQuestions: number,
        points: number,
        title: string,
    },
    questions?: QuestionDetails[]
}