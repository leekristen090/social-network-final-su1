import {Link, useNavigate, useParams} from "react-router-dom";
import {IoCloseSharp} from "react-icons/io5";
import {useSelector} from "react-redux";
import {Button} from "react-bootstrap";

export default function UserDetails() {
    const navigate = useNavigate();
    const {userId} = useParams();
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const {users} = useSelector((state: any) => state.usersReducer);
    const user = users.find((u: any) => u._id === userId);
    return (
        <div id={"sn-user-details"} className={"sn-below-header position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25"}>
            <div>
                <button onClick={() => navigate(-1)} className={"btn float-end end-0 wd-close-details"}>
                    <IoCloseSharp className={"fs-1"}/>
                </button>
                <br/><br/>
                <hr/>
                <div id={"sn-user-detail-username"} className={"fs-2 text-wrap text-break word-wrap"}>
                    {user.username}
                </div>
            </div>

            <hr />
            {currentUser && (
                <div>
                    <h5><b>Bio:</b></h5>
                    {user.bio}
                    <Button className={"float-end sn-bg-tan"}>Follow</Button>
                </div>
            )}
            {!currentUser && (
                <div>
                    You must be signed in to view a user's full profile.
                    <hr />
                    <Button onClick={() => navigate("/GoodBooks/Account/Signin")}
                            className={"sn-bg-tan"}>
                        Signin
                    </Button>
                    <br />
                    <Link to={"/GoodBooks/Account/Signup"}>
                        Don't have an account?<br/> Sign up today!
                    </Link>
                </div>
                )}
        </div>
    );
}