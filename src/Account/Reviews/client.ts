import axios from "axios";
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const REVIEWS_API = `${REMOTE_SERVER}/api/reviews`;

export const fetchAllReviews = async () => {
    const response = await axios.get(`${REVIEWS_API}`);
    return response.data;
};
export const fetchReviewsForBook = async (bookId: string) => {
    const response = await axios.get(`${REVIEWS_API}/book/${bookId}`);
    return response.data;
};
export const fetchReviewsForUser = async (userId: string) => {
    const response = await axios.get(`${REVIEWS_API}/user/${userId}`);
    return response.data;
};
export const createReview = async (review: any) => {
    const response = await axios.post(`${REVIEWS_API}`, review);
    return response.data;
};
export const updateReview = async (review: any) => {
    const response = await axios.put(`${REVIEWS_API}/${review._id}`, review);
    return response.data;
};
export const deleteReview = async (reviewId: string) => {
    const response = await axios.delete(`${REVIEWS_API}/${reviewId}`);
    return response.data;
};
