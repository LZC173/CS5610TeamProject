import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const fetchQuizzes = async (courseId: string) => {
    const response =  await axios.get(`${REMOTE_SERVER}/api/quizzes/${courseId}`);
    return response.data;
};
export const fetchDetails = async (quizId: string) => {
    const response =  await axiosWithCredentials.get(`${REMOTE_SERVER}/api/quiz/${quizId}`);
    return response.data;
}
export const deleteQuiz = async (quizId: string) => {
    const response =  await axios.delete(`${REMOTE_SERVER}/api/quiz/${quizId}`);
    return response.data
}
export const createNew =  async (quiz: any, courseId: string) => {
    const response = await axios.put(`${REMOTE_SERVER}/api/updateQuiz/${courseId}`, quiz);
    return response.data;
}
export const updateStatus = async (quizId: string, status: boolean ) => {
    const response = await axios.put(`${REMOTE_SERVER}/api/updateStatus`, { quizId: quizId, status: status});
    return response.data
}


export type AttemptAnswers = Record<string, string>; // using string to string json file which is similar to
//map in backend 

export const getAttemptDetails = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/attemptDetails/${quizId}`
  );
  return data; // 
};

// submit attempt
export const submitAttempt = async (quizId: string, answers: AttemptAnswers) => {
  const { data } = await axiosWithCredentials.put(
    `${REMOTE_SERVER}/api/newAttempt/${quizId}`,
    answers
  );
  return data;
};