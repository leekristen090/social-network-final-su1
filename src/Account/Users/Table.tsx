import {FormControl, Table} from "react-bootstrap";

export default function PeopleTable({ users = [],
                                        deleteUser,
                                        saveUser,
                                        editingUserId,
                                        setEditingUserId,
                                        editedUser,
                                        setEditedUser }: {
    users?: any[];
    deleteUser: (id: string) => void;
    saveUser: (updatedUser: any) => void;
    editingUserId: string | null;
    setEditingUserId: (id: string | null) => void;
    editedUser: any;
    setEditedUser: (user: any) => void;
}) {
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
                    {/*<th>Bio</th>*/}
                    {/*<th>DOB</th>*/}
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user: any) => {
                    const isEditing = editingUserId === user._id;
                    return (
                        <tr key={user._id}>
                            <td id={"sn-username"}>{user.username}</td>
                            {/*<td id={"sn-first-name"}>*/}
                            {/*    {!editing && user.firstName}*/}
                            {/*    /!*{user.firstName}*!/*/}
                            {/*    {editing && (*/}
                            {/*        <FormControl defaultValue={user.firstName} onChange={() => saveUser(user._id)} />*/}
                            {/*    )}*/}
                            {/*</td>*/}
                            <td id={"sn-first-name"}>
                                {isEditing ? (
                                    <FormControl
                                        value={editedUser.firstName || ""}
                                        onChange={(e) =>
                                            setEditedUser({ ...editedUser, firstName: e.target.value })
                                        }
                                    />
                                ) : (
                                    user.firstName
                                )}
                            </td>
                            {/*<td id={"sn-last-name"}>*/}
                            {/*    {!editing && user.lastName}*/}
                            {/*    /!*{user.lastName}*!/*/}
                            {/*    {editing && (*/}
                            {/*        <FormControl defaultValue={user.lastName} onChange={() => saveUser(user._id)} />*/}
                            {/*    )}*/}
                            {/*</td>*/}
                            <td id={"sn-last-name"}>
                                {isEditing ? (
                                    <FormControl
                                        value={editedUser.lastName || ""}
                                        onChange={(e) =>
                                            setEditedUser({ ...editedUser, lastName: e.target.value })
                                        }
                                    />
                                ) : (
                                    user.lastName
                                )}
                            </td>
                            <td id={"sn-role"}>{user.role}</td>
                            {/*<td id={"sn-bio"}>{user.bio}</td>*/}
                            {/*<td id={"sn-dob"}>{user.dob}</td>*/}
                            <td>
                                <button className={"float-end btn btn-danger"} id={"sn-delete-user-btn"}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            deleteUser(user._id);
                                        }}>
                                    Delete
                                </button>
                                {/*{!editing && (*/}
                                {/*    <button className={"float-end btn sn-bg-tan me-1"} id={"sn-edit-user-btn"} onClick={() =>setEditing(true)}>*/}
                                {/*        Edit*/}
                                {/*    </button>*/}
                                {/*)}*/}
                                {/*{editing && (*/}
                                {/*    <button className={"float-end btn sn-bg-tan me-1"} id={"sn-save-user-btn"} onClick={() =>setEditing(false)}>*/}
                                {/*        Save*/}
                                {/*    </button>*/}
                                {/*)}*/}
                                {isEditing ? (
                                    <button
                                        className={"float-end btn sn-bg-tan me-1"}
                                        id={"sn-save-user-btn"}
                                        onClick={() => {
                                            saveUser({ ...user, ...editedUser });
                                            setEditingUserId(null);
                                        }}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        className={"float-end btn sn-bg-tan me-1"}
                                        id={"sn-edit-user-btn"}
                                        onClick={() => {
                                            setEditingUserId(user._id);
                                            setEditedUser({
                                                firstName: user.firstName,
                                                lastName: user.lastName,
                                            });
                                        }}
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    );
}