import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentBook: null,
};
const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setCurrentBook: (state, action) => {
            state.currentBook = action.payload;
        },
    },
});
export const {setCurrentBook} = bookSlice.actions;
export default bookSlice.reducer;