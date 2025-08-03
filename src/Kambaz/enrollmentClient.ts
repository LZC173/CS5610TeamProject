import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollInCourse = async(details : any)=>{
    const { data } = await axios.put(`${ENROLLMENTS_API}/enroll`, details);
    return data;
}
export const unEnrollInCourse = async(details : any)=>{
    const { data } = await axios.delete(`${ENROLLMENTS_API}/unEnroll`, {
        data: details
    });
    return data;
}