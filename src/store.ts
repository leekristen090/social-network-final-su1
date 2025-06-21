import {configureStore} from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer.ts";
import goalsReducer from "./Account/Goals/reducer.ts";
import followingReducer from "./Account/Following/reducer.ts";
import booksReducer from "./Home/Books/reducer.ts";
import usersReducer from "./Account/Users/reducer.ts";

const store = configureStore({
    reducer: {
        accountReducer,
        goalsReducer,
        followingReducer,
        booksReducer,
        usersReducer
    },
});
export default store;