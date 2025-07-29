import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import dbQuizzes from "../../Database/quizzes.json"; 
import { v4 as uuidv4 } from "uuid";

export interface Quiz {
  id: string;
  course: string;
  title: string;
  availability: {
    status: string;
    dueDate?: string;
    notAvailableUntil?: string;
  };
  dueDates?: string[];
  points: number;
  questionCount: number;
  published: boolean;
}

interface QuizzesState {
  quizzes: Quiz[];
}

const initialState: QuizzesState = {
  quizzes: dbQuizzes,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (
      state,
      action: PayloadAction<{
        id?: string;
        course: string;
        title: string;
        availability: Quiz["availability"];
        points: number;
        questionCount: number;
        published: boolean;
      }>
    ) => {
      const p = action.payload;
      const id = p.id ?? uuidv4();
      state.quizzes.push({ ...p, id });
    },

    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q) => q.id !== action.payload);
    },

    updateQuiz: (
      state,
      action: PayloadAction<{
        originalId: string;
        updated: Quiz;
      }>
    ) => {
      const { originalId, updated } = action.payload;
      state.quizzes = state.quizzes.map((q) =>
        q.id === originalId ? updated : q
      );
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
