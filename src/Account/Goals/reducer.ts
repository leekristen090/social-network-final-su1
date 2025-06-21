import {createSlice} from "@reduxjs/toolkit";
import { goals } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    goals: goals,
};
const goalsSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
        addGoal: (state, {payload: goal}) => {
            const newGoal: any = {
                _id: uuidv4(),
                user: goal.user,
                goalDescription: goal.goalDescription,
                percentage: goal.percentage,
            };
            state.goals = [...state.goals, newGoal] as any;
        },
        deleteGoal: (state, {payload: goalId}) => {
            state.goals = state.goals.filter((g: any) => g._id !== goalId);
        },
        editGoal: (state, {payload: goalId}) => {
            state.goals = state.goals.map((g: any) => g._id === goalId ? {...g, editing: true} : g) as any;
        },
        updateGoal: (state, {payload: goal}) => {
            state.goals = state.goals.map((g: any) => g._id === goal._id ? goal : g) as any;
        },
    },
});
export const { addGoal, deleteGoal, editGoal, updateGoal } = goalsSlice.actions;
export default goalsSlice.reducer;