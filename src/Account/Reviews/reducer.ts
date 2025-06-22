import {createSlice} from "@reduxjs/toolkit";
import { reviews } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    reviews: reviews,
};
const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        addReview: (state, {payload: review}) => {
            const newReview: any = {
                _id: uuidv4(),
                bookId: review.bookId,
                userId: review.userId,
                text: review.text,
                timestamp: review.timestamp,
            };
            state.reviews = [...state.reviews, newReview] as any;
        },
        deleteReview: (state, {payload: reviewId}) => {
            state.reviews = state.reviews.filter((r: any) => r._id !== reviewId);
        },
        editReview: (state, {payload: reviewId}) => {
            state.reviews = state.reviews.map((r: any) => r._id === reviewId ? {...r, editing: true} : r) as any;
        },
        updateReview: (state, {payload: review}) => {
            state.reviews = state.reviews.map((r: any) => r._id === review._id ? review : r) as any;
        }
    },
});
export const { addReview, deleteReview, editReview, updateReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;