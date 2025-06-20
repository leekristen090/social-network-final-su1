import {FormControl, FormSelect} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Signup() {
    // const [user, setUser] = useState<any>({});
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const signup = () => {
    // };
    return (
        <div id={"sn-signup-screen"} className={"sn-margin-right-left"}>
            <h3>Create New Account</h3>
            <FormControl placeholder={"jdoe@email.com"} id={"sn-email"} type={"email"} className={"mb-2"}/>
            <FormControl placeholder={"username"} id={"sn-username"} type={"text"} className={"mb-2"} />
            <FormControl placeholder={"password"} id={"sn-password"} type={"password"} className={"mb-2"} />
            <FormControl placeholder={"verify password"} id={"sn-password-verify"} type={"password"} className={"mb-2"} />
            <FormSelect id={"sn-role"} className={"mb-2"}>
                <option value={"READER"}>Reader</option>
                <option value={"AUTHOR"}>Author</option>
                <option value={"ADMIN"}>Admin</option>
            </FormSelect>
            <Link to={"/GoodBooks/Account/Profile"} className={"btn btn-primary w-100 mb-2"} id={"sn-signup-btn"}>
                Sign up
            </Link>
        </div>
    );
}