import {Button, Table} from "react-bootstrap";
import * as db from "../Database";
import {useSelector} from "react-redux";
import {useState} from "react";

export default function Following() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const [users] = useState(db.users);
    const followingUsers = users.filter(user => currentUser?.following.includes(user._id));
    return (
        <div id={"sn-user-following"}>
            <Table striped className={"w-100"} id={"sn-user-following-table"}>
                <thead>
                <tr>
                    <th>People you are following ({followingUsers.length}): </th>
                </tr>
                </thead>
                <tbody>
                {followingUsers.map((user) => (
                    <tr key={user._id}>
                        <td>
                            {user.username}
                            {/*<Button className={"float-end sn-bg-tan"} id={"sn-user-follow-button"}>*/}
                            {/*    Follow*/}
                            {/*</Button>*/}
                            <Button className={"float-end me-1 btn-danger"} id={"sn-user-unfollow-button"}>
                                Unfollow
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}