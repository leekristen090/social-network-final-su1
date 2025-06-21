import {createSlice} from "@reduxjs/toolkit";
import {books} from "../../Database";

const initialState = {
    books: books,
};
const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload;
        },
    },
});
export const {setBooks} = booksSlice.actions;
export default booksSlice.reducer;