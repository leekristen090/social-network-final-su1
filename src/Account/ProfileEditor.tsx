import {Alert, Button, Card, FormControl} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import * as db from "../Database";

export default function ProfileEditor() {
    const {userId} = useParams();
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const [profile, setProfile] = useState<any>({});
    // const [error, setError] = useState("");
    // const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    //const dispatch = useDispatch();
    const isEditable = currentUser && (currentUser._id === userId || currentUser.role === "ADMIN");
    const handleCancel = () => {
        navigate("/GoodBooks/Account/Profile");
    };
    const handleSave = () => {
        navigate("/GoodBooks/Account/Profile");
    };
    // const handleSave = () => {
    //     const updatedUsers = db.users.map(u =>
    //         u._id === profile._id ? profile : u
    //     );
    //     //db.users = updatedUsers;
    //     if (currentUser._id === userId) {
    //         dispatch(setCurrentUser(updatedUsers))
    //     }
    //     setSuccess("Profile updated successfully!");
    //     //navigate("/GoodBooks/Account/Profile")
    //     setTimeout(() => navigate("/GoodBooks/Account/Profile/User"), 1500);
    // };
    // const handleSave = (e: React.FormEvent) => {
    //     e.preventDefault();
    //
    //     try {
    //         // Update in mock database
    //         db.users = db.users.map(u =>
    //             u._id === profile._id ? profile : u
    //         );
    //
    //         // Update current user in state if editing own profile
    //         if (currentUser._id === profile._id) {
    //             dispatch(setCurrentUser(profile));
    //         }
    //
    //         setSuccess("Profile updated successfully!");
    //         setTimeout(() => navigate("/GoodBooks/Account/Profile/User"), 1500);
    //     } catch (err) {
    //         setError("Failed to update profile");
    //     }
    // };
    useEffect(() => {
        if (!userId) {
            navigate("/GoodBooks/Account/Profile");
            return;
        }
        const user = db.users.find(u => u._id === userId);
        if (!user) {
            // setError("User not found!");
            return;
        }
        setProfile(user);
    }, [userId]);
    if (!isEditable) {
        return (
            <Alert variant="danger">
                You don't have permission to edit this profile.
            </Alert>
        );
    }
    return (
        <div id={"sn-profile-editor"}>
            {/*{error && <Alert variant="danger">{error}</Alert>}*/}
            {/*{success && <Alert variant={"success"}>{success}</Alert> }*/}
            <Card id={"sn-profile-editor-card"}>
                <Card.Body>
                    <h3>Public Information</h3>
                    Username:
                    <FormControl type={"text"} placeholder={"Username"} id={"sn-username"} defaultValue={profile.username}
                                 onChange={(e) => setProfile({...profile, username: e.currentTarget.value})} /><br/>
                    Bio:
                    <FormControl type={"text"} placeholder={"Bio"} id={"sn-bio"} defaultValue={profile.bio}
                                 onChange={(e) => setProfile({...profile, bio: e.target.value})} />
                    <hr/>
                    <h3>Private Information</h3>
                    Email:
                    <FormControl type={"email"} placeholder={"email@example.com"} id={"sn-email"} defaultValue={profile.email}
                                 onChange={(e) => setProfile({...profile, email: e.target.value})} /><br/>
                    First Name:
                    <FormControl type={"text"} placeholder={"first name"} id={"sn-first-name"} defaultValue={profile.firstName}
                                 onChange={(e) => setProfile({...profile, firstName: e.target.value})} /><br/>
                    Last Name:
                    <FormControl type={"text"} placeholder={"last name"} id={"sn-last-name"} defaultValue={profile.lastName}
                                 onChange={(e) => setProfile({...profile, lastName: e.target.value})} /><br/>
                    Date of Birth:
                    <FormControl type={"date"} placeholder={"2020-01-01"} id={"sn-dob"} />
                </Card.Body>
                <Card.Footer>
                    <Button className={"float-end sn-bg-tan"} id={"sn-profile-edit-save-button"}
                            onClick={handleSave} type={"submit"}>
                        Save
                    </Button>
                    <Button variant={"danger"} className={"float-end me-1"}
                            id={"sn-profile-edit-cancel-button"} onClick={handleCancel}>
                        Cancel
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    );
}