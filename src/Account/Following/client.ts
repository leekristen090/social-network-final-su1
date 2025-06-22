import axios from "axios";
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const FOLLOWING_API = `${REMOTE_SERVER}/api/following`;

export const followUser = async (userId: string, targetId: string) => {
    const response = await axios.post(`${FOLLOWING_API}`, {userId, targetId});
    return response.data;
};
export const unfollowUser = async (userId: string, targetId: string) => {
    const response = await axios.delete(`${FOLLOWING_API}`, {data: {userId, targetId}});
    return response.data;
};
export const fetchFollowing = async (userId: string) => {
    const response = await axios.get(`${FOLLOWING_API}/${userId}`);
    return response.data;
};