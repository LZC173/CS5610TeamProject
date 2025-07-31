import Signin from "./Signin";
import {Routes} from "react-router-dom";
import {Navigate, Route} from "react-router";
import Signup from "./Signup.tsx";
import Profile from "./Profile.tsx";
import AccountNavigation from "./Navigation.tsx";
import {useSelector} from "react-redux";
export default function Account() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <div id="wd-account-screen">
            <h2>Account</h2>
            <table>
                <tbody>
                <tr>
                    <td valign="top">
                        <AccountNavigation/>
                    </td>
                    <td valign="top">
                        <Routes>
                            <Route path="/" element={<Navigate to={ currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin" }/>}/>
                            <Route path="/Signin" element={<Signin/>}/>
                            <Route path="/Signup" element={<Signup/>}/>
                            <Route path="/Profile" element={<Profile/>}/>
                        </Routes>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}