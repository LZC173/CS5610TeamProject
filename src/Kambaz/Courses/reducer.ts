/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    courses : []
}

const coursesSlice = createSlice({
    name: "courses",
    initialState: initialState,
    reducers: {
        setInitialCourses: (state, action) => {
            state.courses = action.payload;
        },
        addCourse: (state, {payload: course})=>{
            console.log(course)
            const newCourse  = {
                _id: course._id ? course._id : uuidv4(),
                name: course.name,
                description: course.description
            }
            state.courses = [...state.courses, newCourse] as any;
        },
        deleteCourse:(state, {payload: courseId})=>{
            state.courses = state.courses.filter(
                (course: any)=>course._id !== courseId) ;
        },
        updateCourse:(state, {payload: course})=>{
            state.courses = state.courses.map((c: any) => c._id === course._id ? course : c) as any
        }
    }
});

export const {addCourse, deleteCourse, updateCourse, setInitialCourses } = coursesSlice.actions;
export default coursesSlice.reducer;