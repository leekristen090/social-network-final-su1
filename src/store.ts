import {configureStore} from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer.ts";

const store = configureStore({
    reducer: {
        accountReducer,
    },
});
export default store;