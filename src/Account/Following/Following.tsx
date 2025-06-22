import {Button, Table} from "react-bootstrap";
import * as db from "../../Database";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Link} from "react-router-dom";
import {unfollowUser} from "./reducer.ts";

export default function Following() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();
    const [users] = useState(db.users);
    const {following} = useSelector((state: any) => state.followingReducer);
    const followingUsers = following
        .filter((f: any) => f.user === currentUser?._id)
        .map((rel: any) => users.find((user: any) => user._id === rel.target))
        .filter(Boolean);
    if (!currentUser) return null;
    return (
        <div id={"sn-user-following"}>
            <Table striped className={"w-100"} id={"sn-user-following-table"} width={"550px"}>
                <thead>
                <tr>
                    <th>People you are following ({followingUsers.length}):</th>
                </tr>
                </thead>
                <tbody>
                {followingUsers.map((user: any) => {
                    if (!user) return null;
                    return (
                        <tr key={user._id}>
                            <td>
                                <Link to={`/GoodBooks/Account/Profile/Following/${user._id}`}>
                                    {user.username}
                                </Link>
                                <Button className={"float-end me-1 btn-danger"} id={"sn-user-unfollow-button"}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            dispatch(unfollowUser({userId: currentUser._id, targetId: user._id}));
                                        }}>
                                    Unfollow
                                </Button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    );
}