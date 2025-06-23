import {Button, Table} from "react-bootstrap";
import * as db from "../../Database";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as followingClient from "./client.ts";

export default function Following() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const [followingUsers, setFollowingUsers] = useState<any[]>([]);

    const fetchFollowingUsers = async () => {
        if (!currentUser) return;
        const following = await followingClient.fetchFollowing(currentUser._id);
        const users = db.users;
        const matched = following
            .filter((f: any) => f.user === currentUser._id)
            .map((rel: any) => users.find((user: any) => user._id === rel.target))
            .filter(Boolean);
        setFollowingUsers(matched);
    };

    const handleUnfollow = async (targetId: string) => {
        await followingClient.unfollowUser(currentUser._id, targetId);
        await fetchFollowingUsers();
    };

    useEffect(() => {
        fetchFollowingUsers();
    }, [currentUser]);

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
                {followingUsers.map((user: any) => (
                    <tr key={user._id}>
                        <td>
                            <Link to={`/GoodBooks/Account/Profile/Following/${user._id}`}>
                                {user.username}
                            </Link>
                            <Button
                                className={"float-end me-1 btn-danger"}
                                id={"sn-user-unfollow-button"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleUnfollow(user._id);
                                }}>
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
