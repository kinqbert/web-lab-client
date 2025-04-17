import { Goal } from "@/types/goals";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export const getGoals = async (): Promise<Goal[]> => {
  return await fetchWithAuth("http://localhost:5050/goals/");
};

export const createGoal = async (payload: {
  goalName: string;
  targetAmount: number;
  deadline?: string;
}) => {
  return await fetchWithAuth("http://localhost:5050/goals", {
    method: "POST",
    body: payload,
  });
};
