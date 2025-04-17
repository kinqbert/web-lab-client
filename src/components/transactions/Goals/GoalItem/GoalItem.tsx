import { Progress } from "@/components/ui/progress";
import { TableCell, TableRow } from "@/components/ui/table";
import { Goal } from "@/types/goals";
import { getGoalStatusText } from "@/utils/getGoalStatusText";

interface Props {
  goal: Goal;
}

export const GoalItem = ({ goal }: Props) => {
  const progressPercentage = Math.min(
    (goal.currentAmount / goal.targetAmount) * 100,
    100
  );

  return (
    <TableRow key={goal._id}>
      <TableCell className="font-medium">{goal.goalName}</TableCell>
      <TableCell>{getGoalStatusText(goal.status)}</TableCell>
      <TableCell>{goal.currentAmount}</TableCell>
      <TableCell>{goal.targetAmount}</TableCell>
      <TableCell className="flex items-center gap-3">
        <Progress value={progressPercentage} />
        <span className="w-20">{progressPercentage.toFixed(2)}</span>
      </TableCell>
    </TableRow>
  );
};
