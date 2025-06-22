import axios from "axios";
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const GOALS_API = `${REMOTE_SERVER}/api/goals`;

export const fetchGoalsForUser = async (userId: string) => {
    const response = await axios.get(`${GOALS_API}/${userId}`);
    return response.data;
};
export const createGoal = async (goal: any) => {
    const response = await axios.post(`${GOALS_API}`, goal);
    return response.data;
};
export const updateGoal = async (goal: any) => {
    const response = await axios.put(`${GOALS_API}/${goal._id}`, goal);
    return response.data;
};
export const deleteGoal = async (goalId: string) => {
    const {data} = await axios.delete(`${GOALS_API}/${goalId}`);
    return data;
};