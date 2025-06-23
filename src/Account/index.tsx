import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../Login";
import Profile from "./Profile/Profile.tsx";
import Signup from "../Login/Signup.tsx";
import AccountNav from "./AccountNav.tsx";
import {useSelector} from "react-redux";
import AdminUsers from "./Users/AdminUsers.tsx";

export default function Account() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    return (
        <div id={"sn-account"} className={"sn-below-header"}>
            <table>
                <tr>
                    <td valign={"top"}><AccountNav /></td>
                    <td valign={"top"}>
                        <Routes>
                            <Route path={"/"} element={<Navigate to={currentUser ? "/GoodBooks/Account/Profile" : "/GoodBooks/Account/Signin"}/>}/>
                            <Route path={"/Signin"} element={<Login />} />
                            <Route path={"/Profile/*"} element={<Profile />} />
                            <Route path={"/Signup"} element={<Signup />} />
                            <Route path={"/Users"} element={<AdminUsers />} />
                        </Routes>
                    </td>
                </tr>
            </table>
        </div>
    );
}