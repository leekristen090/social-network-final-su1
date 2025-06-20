import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../Login";
import Profile from "./Profile.tsx";
import Signup from "./Signup.tsx";
import AccountNav from "./AccountNav.tsx";
import {useSelector} from "react-redux";

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
                        </Routes>
                    </td>
                </tr>
            </table>
        </div>
    );
}