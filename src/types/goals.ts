export enum GOAL_STATUS {
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  FAILED = "failed",
}

export type Goal = {
  _id: string;
  goalName: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  status: GOAL_STATUS;
};
