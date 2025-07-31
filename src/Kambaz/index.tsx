/* eslint-disable @typescript-eslint/no-explicit-any */
import Account from "./Account";
import {Routes} from "react-router-dom";
import {Navigate, Route} from "react-router";
import Dashboard from "./Dashboard.tsx";
import KambazNavigation from "./Navigation.tsx";
import Courses from "./Courses";
import "./style.css";
import ProtectedRoute from "./Account/ProtectedRoute.tsx";

export default function Kambaz() {
    return (
        <div id="wd-kambaz">
            <KambazNavigation/>
                    <div className="wd-main-content-offset p-3">
                        <Routes>
                            <Route path="/" element={<Navigate to="/Kambaz/Account"/>}/>
                            <Route path="/Account/*" element={<Account/>}/>
                            <Route path="Dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="Courses/:cid/*" element={
                                <ProtectedRoute requireEnrollment={true}>
                                    <Courses />
                                </ProtectedRoute>} />
                            <Route path="/Calendar" element={<h1>Calendar</h1>} />
                            <Route path="/Inbox" element={<h1>Inbox</h1>} />
                        </Routes>
                    </div>
        </div>
    );
}
