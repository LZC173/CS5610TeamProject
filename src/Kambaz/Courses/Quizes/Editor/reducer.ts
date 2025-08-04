import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";


const initialState = {
    questions: [],
    updatedQuestionIds: new Set<string>(),
    deleteQuestionIds: new Set<string>(),
    newQuestionIds: new Set<string>()
}

const editorSlices = createSlice({
    name: "editor",
    initialState,
    reducers: {
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
            // @ts-ignore
            state.newQuestionIds = new Set([...state.newQuestionIds, newQuestion.questionId])
        },
        deleteQuestion:(state, action) => {
            // @ts-ignore
            state.questions = state.questions.filter((q)=> q.questionId !== action.payload);
            if(state.newQuestionIds.has(action.payload)) {
                const newSet = new Set(state.newQuestionIds);
                newSet.delete(action.payload);
                state.newQuestionIds = newSet;
            }
            else {
                if(state.updatedQuestionIds.has(action.payload)) {
                    const newSet = new Set(state.updatedQuestionIds);
                    newSet.delete(action.payload);
                    state.updatedQuestionIds = newSet;
                }
                state.deleteQuestionIds = new Set([...state.deleteQuestionIds, action.payload])
            }
        },
        updateQuestion:(state, action) => {
            // @ts-ignore
            state.questions = state.questions.map((q)=> q.questionId === action.payload.questionId ? action.payload : q);
            if(!state.newQuestionIds.has(action.payload.questionId)){
                state.updatedQuestionIds = new Set([...state.updatedQuestionIds, action.payload.questionId])
            }
        }
    }
})

export const {setQuestions, addQuestion, deleteQuestion, updateQuestion} = editorSlices.actions;
export default editorSlices.reducer;