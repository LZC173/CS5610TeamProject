import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    details: {
        dates: {
            availableFrom: new Date().toDateString(),
            availableUntil: new Date().toDateString(),
            dueDate: new Date().toDateString()
        },
        description: "",
        title: ""
    },
    questions: [],
    updatedQuestionIds: [] as string[],
    deleteQuestionIds: [] as string[],
    newQuestionIds: [] as string[],
    points: 0
}

const editorSlices = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setDetails: (state, action) => {
            state.details = action.payload;
        },
        setQuestions: (state, action) => {
            state.questions = action.payload
        },
        addQuestion: (state, action) => {
            const newQuestion = {
                ...action.payload,
                questionId: uuidv4()
            }
            // @ts-ignore
            state.questions = [...state.questions, newQuestion]
            state.newQuestionIds = [...state.newQuestionIds, newQuestion.questionId];
        },
        deleteQuestion: (state, action) => {
            const questionId = action.payload as string;

            state.questions = state.questions.filter((q: any) => q.questionId !== questionId);

            if (state.newQuestionIds.includes(questionId)) {
                state.newQuestionIds = state.newQuestionIds.filter(id => id !== questionId);
            } else {
                if (state.updatedQuestionIds.includes(questionId)) {
                    state.updatedQuestionIds = state.updatedQuestionIds.filter(id => id !== questionId);
                }
                if (!state.deleteQuestionIds.includes(questionId)) {
                    state.deleteQuestionIds = [...state.deleteQuestionIds, questionId];
                }
            }
        },
        updateQuestion: (state, action) => {
            const updatedQuestion = action.payload;

            // @ts-ignore
            state.questions = state.questions.map((q: any) =>
                q.questionId === action.payload.questionId ? action.payload : q
            );

            if (!state.newQuestionIds.includes(updatedQuestion.questionId)) {
                if (!state.updatedQuestionIds.includes(updatedQuestion.questionId)) {
                    state.updatedQuestionIds = [...state.updatedQuestionIds, updatedQuestion.questionId];
                }
            }
        },
        clearData: (state) => {
            Object.assign(state, initialState);
        },
        changePoints: (state, action) =>{
            state.points = state.points + action.payload
        },
        setPoints:(state, action)=>{
            state.points = action.payload
        }
    }
})

export const {setDetails, setQuestions, addQuestion, deleteQuestion, updateQuestion, clearData, changePoints, setPoints} = editorSlices.actions;
export default editorSlices.reducer;