import {Button, FormControl} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
// import * as db from "../Database";
import {setCurrentUser} from "../Account/reducer.ts";
import * as usersClient from "../Account/client.ts";

export default function Login() {
    const [credentials, setCredentials] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signin = async () => {
        // const user = db.users.find((u: any) => u.username === credentials.username && u.password === credentials.password);
        const user = await usersClient.signin(credentials);
        if (!user) return;
        dispatch(setCurrentUser(user));
        navigate("/GoodBooks/Home");
    };
    return (
        <div id={"sn-login-screen"} className={"sn-margin-right-left"}>
            <h3>Log In</h3>
            <FormControl placeholder={"username"} id={"sn-username"} type={"text"} className={"mb-2"}
                         onChange={(e) => setCredentials({...credentials, username: e.target.value})} />
            <FormControl placeholder={"password"} id={"sn-password"} type={"password"} className={"mb-2"}
                         onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
            <Button id={"sn-signin-btn"} className={"btn btn-primary w-100 mb-2"} onClick={signin}>
                Sign in
            </Button>
            <Link to={"/GoodBooks/Account/Signup"} id={"wd-signup-link"}>Don't have an account? Create new account</Link>
        </div>
    );
}