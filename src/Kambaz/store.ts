

import { enableMapSet } from 'immer';
enableMapSet();  
import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import coursesReducer from "./Courses/reducer.ts";
import enrollmentsReducer from "./Courses/enrollmentsReducer.tsx";
import quizzesReducer from "./Courses/Quizes/reducer.ts";
import editorReducer from "./Courses/Quizes/Editor/reducer.ts";

const store = configureStore({
    reducer: {
        modulesReducer,
        accountReducer,
        assignmentsReducer,
        coursesReducer,
        enrollmentsReducer,
        quizzesReducer,
        editorReducer
    },
});
export default store;