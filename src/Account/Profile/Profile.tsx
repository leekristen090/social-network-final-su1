import ProfileTOC from "./ProfileTOC.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import ProfileInfo from "./ProfileInfo.tsx";
import Reviews from "../Reviews.tsx";
import Following from "../Following/Following.tsx";
import ProfileEditor from "./ProfileEditor.tsx";
import FollowingProfile from "../Following/FollowingProfile.tsx";
import ProtectedRoute from "../ProtectedRoute.tsx";

export default function Profile() {
    return (
        <div id={"sn-profile-screen"} className={"sn-margin-right-left"}>
            <h1>Profile</h1><hr/>
            <ProfileTOC />
            <Routes>
                <Route path={"/"} element={<Navigate to={"User"} />}  />
                <Route path={"User"} element={
                    <ProtectedRoute>
                        <ProfileInfo />
                    </ProtectedRoute>
                } />
                <Route path={"User/:userId"} element={
                    <ProtectedRoute>
                        <ProfileEditor />
                    </ProtectedRoute>
                } />
                <Route path={"Reviews"} element={
                    <ProtectedRoute>
                        <Reviews />
                    </ProtectedRoute>
                } />
                <Route path={"Following"} element={
                    <ProtectedRoute>
                        <Following />
                    </ProtectedRoute>
                } />
                <Route path={"Following/:userId"} element={<FollowingProfile />} />
            </Routes>
        </div>
    );
}