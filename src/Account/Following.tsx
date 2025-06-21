import {Button, Table} from "react-bootstrap";
import * as db from "../Database";
import {useSelector} from "react-redux";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function Following() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const [users] = useState(db.users);
    const [following] = useState(db.following);
    const followingRelationship = following.filter(f => f.user === currentUser._id);
    //const followingUsers = users.filter(user => currentUser?.following.includes(user._id));
    const followingUsers = followingRelationship
        .map(rel => users.find(user => user._id === rel.target))
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
                {/*{followingUsers.map((user) => (*/}
                {/*    <tr key={user._id}>*/}
                {/*        <td>*/}
                {/*            <Link to={`/GoodBooks/Account/Profile/Following/${user._id}`}>*/}
                {/*                {user.username}*/}
                {/*            </Link>*/}
                {/*            /!*<Button className={"float-end sn-bg-tan"} id={"sn-user-follow-button"}>*!/*/}
                {/*            /!*    Follow*!/*/}
                {/*            /!*</Button>*!/*/}
                {/*            <Button className={"float-end me-1 btn-danger"} id={"sn-user-unfollow-button"}>*/}
                {/*                Unfollow*/}
                {/*            </Button>*/}
                {/*        </td>*/}
                {/*    </tr>*/}
                {/*))}*/}
                {followingUsers.map((user) => {
                    if (!user) return null;
                    return (
                        <tr key={user._id}>
                            <td>
                                <Link to={`/GoodBooks/Account/Profile/Following/${user._id}`}>
                                    {user.username}
                                </Link>
                                <Button className={"float-end me-1 btn-danger"} id={"sn-user-unfollow-button"}>
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