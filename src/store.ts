import {configureStore} from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer.ts";
import goalsReducer from "./Account/Goals/reducer.ts";
import followingReducer from "./Account/Following/reducer.ts";

const store = configureStore({
    reducer: {
        accountReducer,
        goalsReducer,
        followingReducer
    },
});
export default store;