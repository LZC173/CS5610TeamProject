import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import quizzes from "../../Database/quizzes.json";
import { v4 as uuidv4 } from "uuid";


interface QuizzesState {
  quizzes: Quiz[];
}

const initialState: QuizzesState = {
  quizzes: quizzes,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (
      state,
      action: PayloadAction<{
        quizId?: string;
        course: string;
        title: string;
        description: string;
        dates: Quiz["dates"];
        points: number;
        noOfQuestions: number;
      }>
    ) => {
      const p = action.payload;
      const quizId = p.quizId ?? uuidv4();
      state.quizzes.push({ ...p, quizId });
    },

    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q) => q.quizId !== action.payload);
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
        q.quizId === originalId ? updated : q
      );
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
