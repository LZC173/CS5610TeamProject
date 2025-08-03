import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const fetchQuizzes = async (courseId: string) => {
    const response =  await axios.get(`${REMOTE_SERVER}/api/quizzes/${courseId}`);
    return response.data;
};
export const fetchDetails = async (quizId: string) => {
    const response =  await axios.get(`${REMOTE_SERVER}/api/quiz/${quizId}`);
    return response.data;
}
export const createQuiz = async (quiz: any) => {
    const response = await axios.put(`${REMOTE_SERVER}/api/quiz`, quiz);
    return response.data;
}
export const deleteQuiz = async (quizId: string) => {
    const response =  await axios.delete(`${REMOTE_SERVER}/api/quiz/${quizId}`);
    return response.data
}