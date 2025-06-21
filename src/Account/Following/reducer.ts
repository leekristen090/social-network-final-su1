import {createSlice} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {following} from "../../Database";

const initialState = {
    following: following,
};
const followingSlice = createSlice({
    name: "following",
    initialState,
    reducers: {
        setFollowing: (state, action) => {
            state.following = action.payload;
        },
        followUser: (state, {payload}) => {
            const {userId, targetId} = payload;
            const exists = state.following.some((f: any) => f.user === userId && f.target === targetId);
            if (!exists) {
                const newFollowing = {
                    _id: uuidv4(),
                    user: userId,
                    target: targetId,
                };
                state.following = [...state.following, newFollowing];
            }
        },
        unfollowUser: (state, {payload}) => {
            const {userId, targetId} = payload;
            state.following = state.following.filter((f: any) => !(f.user === userId && f.target === targetId));
        }
    },
});
export const {setFollowing, followUser, unfollowUser} = followingSlice.actions;
export default followingSlice.reducer;