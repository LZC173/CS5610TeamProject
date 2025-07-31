/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {enrollments} from "../Database";

const intialState = {
    enrollments: enrollments
}

const enrollmentsSlicer =  createSlice({
    name: "enrollments",
    initialState: intialState,
    reducers: {
        addEnrollment:(state, {payload: enrollment }) => {
            const newEnrollment = {
                _id: uuidv4(),
                user: enrollment.user,
                course: enrollment.course
            }
            state.enrollments = [...state.enrollments,newEnrollment]
            console.log(state.enrollments)
        },
        deleteEnrollment:(state, {payload: details})=>{
            state.enrollments = state.enrollments.filter((enrollment: any)=>!(enrollment.user === details.user && enrollment.course === details.course))
        },
    }
});

export const {addEnrollment, deleteEnrollment} = enrollmentsSlicer.actions;
export default enrollmentsSlicer.reducer;