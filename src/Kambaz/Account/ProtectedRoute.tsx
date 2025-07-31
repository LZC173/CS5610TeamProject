/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedRoute({children, requireEnrollment = false}: { children: any; requireEnrollment?: boolean;
}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { cid } = useParams();
    const { enrollments } = useSelector((state: any)=>state.enrollmentsReducer);

    if (!currentUser) {
        return <Navigate to="/Kambaz/Account/Signin" />;
    }

    if (requireEnrollment && cid) {
        const isEnrolled = enrollments.some(
            (enrollment: any) =>
                enrollment.user === currentUser._id &&
                enrollment.course === cid
        );

        if (!isEnrolled) {
            return <Navigate to="/Kambaz/Dashboard" />;
        }
    }

    return children;
}