import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

export default function AccountNav() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    //const links = currentUser ? ["Profile"] : ["Signin", "Signup"]
    const {pathname} = useLocation();
    return (
        <div id={"sn-account-navigation"} className={"fs-5"}>
            {/*{links.map((link) => (*/}
            {/*    <div key={link}>*/}
            {/*        <Link to={`/GoodBooks/Account/${link}`}*/}
            {/*              className={`list-group-item border border-0 ${pathname.includes(link) ? "border-start border-black border-3" : ""}`}>*/}
            {/*            {link}*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*))}*/}
            {/*need to add a users tab for admin users to be able to edit or delete users*/}
            {/*<ListGroup></ListGroup>*/}
            {/*<Link to={"/GoodBooks/Account/Signin"} className={`list-group-item border border-0 ${pathname.includes("Signin") ? "border-start border-black border-3" : ""}`}>*/}
            {/*    SignIn*/}
            {/*</Link><br />*/}
            {/*<Link to={"/GoodBooks/Account/Signup"} className={`list-group-item border border-0 ${pathname.includes("Signup") ? "border-start border-black border-3" : ""}`}>*/}
            {/*    SignUp*/}
            {/*</Link><br />*/}
            {/*<Link to={"/GoodBooks/Account/Profile"} className={`list-group-item border border-0 ${pathname.includes("Profile") ? "border-start border-black border-3" : ""}`}>*/}
            {/*    Profile*/}
            {/*</Link>*/}
            {!currentUser && (
                <>
                    <Link to={"/GoodBooks/Account/Signin"} className={`list-group-item border border-0 ${pathname.includes("Signin") ? "border-start border-black border-3" : ""}`}>
                        SignIn
                    </Link><br />
                </>
            )}
            {!currentUser && (
                <>
                    <Link to={"/GoodBooks/Account/Signup"} className={`list-group-item border border-0 ${pathname.includes("Signup") ? "border-start border-black border-3" : ""}`}>
                        SignUp
                    </Link><br />
                </>
            )}
            {currentUser && (
                <>
                    <Link to={"/GoodBooks/Account/Profile"} className={`list-group-item border border-0 ${pathname.includes("Profile") ? "border-start border-black border-3" : ""}`}>
                        Profile
                    </Link>
                </>
            )}
            {currentUser && currentUser.role === "ADMIN" && (
                <Link to={"/GoodBooks/Account/Users"} className={`list-group-item border border-0 ${pathname.includes("Users") ? "border-start border-black border-3" : ""}`}>
                    Users
                </Link>
            )}
        </div>
    );
}