import {Nav} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";

import {useSelector} from "react-redux";

export default function ProfileTOC() {
    const {pathname} = useLocation();
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    //const [users] = useState(db.users);
    //const [following] = useState(db.following);
    const {following} = useSelector((state: any) => state.followingReducer);
    const followingUsers = following.filter((f: any) => f.user === currentUser?._id);
    //const followingUsers = users.filter(user => currentUser?.following.includes(user._id));
    const isViewing = pathname.includes("Following/");

    return (
        <Nav variant={"tabs"}>
            <Nav.Item className={"sn-bg-cream"}>
                <Nav.Link to={"/GoodBooks/Account/Profile/User"} as={Link} active={pathname.includes("User")}
                          className={`${pathname.includes("User") ? "text-black sn-bg-tan" : "text-black"}`}>
                    Account Information
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={"sn-bg-cream"}>
                <Nav.Link to={"/GoodBooks/Account/Profile/Reviews"} as={Link} active={pathname.includes("Reviews")}
                          className={`${pathname.includes("Reviews") ? "text-black" : "text-black"}`}>
                    Reviews
                </Nav.Link>
            </Nav.Item>
            {!isViewing && (
                <Nav.Item className={"sn-bg-cream"}>
                    <Nav.Link to={"/GoodBooks/Account/Profile/Following"} as={Link} active={pathname.includes("Following")}
                              className={`${pathname.includes("Following") ? "text-black" : "text-black"}`}>
                        Following ({followingUsers.length})
                    </Nav.Link>
                </Nav.Item>
            )}
            {isViewing && (
                <Nav.Item className={"sn-bg-cream"}>
                    <Nav.Link to={"/GoodBooks/Account/Profile/Following"} as={Link} active={pathname.includes("Following")}
                              className={`${pathname.includes("Following") ? "text-black" : "text-black"}`}>
                        Back to Following
                    </Nav.Link>
                </Nav.Item>
            )}
        </Nav>
    );
}