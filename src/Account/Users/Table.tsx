import {Table} from "react-bootstrap";

export default function PeopleTable({ users = [], deleteUser }: { users?: any[], deleteUser: (id: string) => void; }) {
    // const deleteUser = async (userId: string) => {
    //     await usersClient.deleteUser(userId);
    // };
    return (
        <div id={"sn-people-table"}>
            <Table striped id={"sn-table-of-people"}>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                    <th>Bio</th>
                    <th>DOB</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user: any) => (
                    <tr key={user._id}>
                        <td id={"sn-username"}>{user.username}</td>
                        <td id={"sn-first-name"}>{user.firstName}</td>
                        <td id={"sn-last-name"}>{user.lastName}</td>
                        <td id={"sn-role"}>{user.role}</td>
                        <td id={"sn-bio"}>{user.bio}</td>
                        <td id={"sn-dob"}>{user.dob}</td>
                        <td>
                            <button className={"float-end btn btn-danger"} onClick={(e) => {
                                e.preventDefault();
                                deleteUser(user._id);
                            }}>
                                Delete
                            </button>
                            <button className={"float-end btn sn-bg-tan me-1"}>Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}