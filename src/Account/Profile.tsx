import ProfileTOC from "./ProfileTOC.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import ProfileInfo from "./ProfileInfo.tsx";
import Reviews from "./Reviews.tsx";
import Following from "./Following.tsx";
import Followers from "./Followers.tsx";
import ProfileEditor from "./ProfileEditor.tsx";

export default function Profile() {
    return (
        <div id={"sn-profile-screen"} className={"sn-margin-right-left"}>
            <h1>Profile</h1><hr/>
            <ProfileTOC />
            <Routes>
                <Route path={"/"} element={<Navigate to={"User"} />}  />
                <Route path={"User"} element={<ProfileInfo />} />
                <Route path={"User/:userId"} element={<ProfileEditor />} />
                <Route path={"Reviews"} element={<Reviews />} />
                <Route path={"Following"} element={<Following />} />
                <Route path={"Followers"} element={<Followers />} />
            </Routes>
        </div>
    );
}