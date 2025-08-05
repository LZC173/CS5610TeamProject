export default interface QuestionDetails {
     questionId?: string; 
    questionTitle: string,
    questionDescription: string,
    questionType: string,
    possibleAnswers: string[],
    correctAnswers: string,
    points: number
}