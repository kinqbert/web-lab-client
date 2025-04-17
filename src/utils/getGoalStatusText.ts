import { GOAL_STATUS } from "@/types/goals";

export const getGoalStatusText = (status: GOAL_STATUS) => {
  switch (status) {
    case GOAL_STATUS.IN_PROGRESS:
      return "In progress";
    case GOAL_STATUS.COMPLETED:
      return "Completed";
    case GOAL_STATUS.FAILED:
      return "Failed";
  }
};
