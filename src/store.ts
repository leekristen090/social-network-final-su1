import {configureStore} from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer.ts";
import goalsReducer from "./Account/Goals/reducer.ts";

const store = configureStore({
    reducer: {
        accountReducer,
        goalsReducer
    },
});
export default store;