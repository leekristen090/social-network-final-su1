import {createSlice} from "@reduxjs/toolkit";
import {users} from "../../Database";

const initialState = {
    users: users,
};
const usersSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});
export const {setUsers} = usersSlice.actions;
export default usersSlice.reducer;