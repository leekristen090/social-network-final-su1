import {FormControl, FormSelect} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import * as usersClient from "../Account/client.ts";
import {setCurrentUser} from "../Account/reducer.ts";

export default function Signup() {
    const [user, setUser] = useState<any>({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        role: "READER",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signup = async () => {
        console.log("Signing up with:", user);
        const currentUser = await usersClient.signup(user);
        dispatch(setCurrentUser(currentUser));
        navigate(`/GoodBooks/Account/Profile`);
    };
    return (
        <div id={"sn-signup-screen"} className={"sn-margin-right-left"}>
            <h3>Create New Account</h3>
            <FormControl placeholder={"First Name"} id={"sn-first-name"} type={"text"}
                         className={"mb-2"}
                         value={user.firstName}
                         onChange={(e) => setUser({...user, firstName: e.target.value})} />
            <FormControl placeholder={"Last Name"} id={"sn-last-name"} type={"text"}
                         className={"mb-2"}
                         value={user.lastName}
                         onChange={(e) => setUser({...user, lastName: e.target.value})} />
            <FormControl placeholder={"jdoe@email.com"} id={"sn-email"} type={"email"}
                         className={"mb-2"}
                         value={user.email}
                         onChange={(e) => setUser({...user, email: e.target.value})} />
            <FormControl placeholder={"username"} id={"sn-username"} type={"text"}
                         className={"mb-2"}
                         value={user.username}
                         onChange={(e) => setUser({...user, username: e.target.value})} />
            <FormControl placeholder={"password"} id={"sn-password"} type={"password"}
                         className={"mb-2"}
                         value={user.password}
                         onChange={(e) => setUser({...user, password: e.target.value})} />
            {/*<FormControl placeholder={"verify password"} id={"sn-password-verify"} type={"password"} className={"mb-2"} />*/}
            <FormSelect id={"sn-role"} className={"mb-2"}
                        value={user.role}
                        onChange={(e) => setUser({...user, role: e.target.value})}>
                <option value={"READER"}>Reader</option>
                <option value={"AUTHOR"}>Author</option>
                <option value={"ADMIN"}>Admin</option>
            </FormSelect>
            <button className={"btn btn-primary w-100 mb-2"} id={"sn-signup-btn"} onClick={signup}>
                Sign up
            </button>
        </div>
    );
}