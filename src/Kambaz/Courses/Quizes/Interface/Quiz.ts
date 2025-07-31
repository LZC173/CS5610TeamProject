export interface Quiz {
    quizId: string;
    course: string;
    title: string;
    description: string;
    dates: {
        availableFrom: string;
        availableUntil: string;
        dueDate: string;
    };
    points: number;
    noOfQuestions: number;
}