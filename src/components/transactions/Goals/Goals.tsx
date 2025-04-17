import { getGoals } from "@/api/server/goals";

import styles from "./styles.module.css";
import { GoalItem } from "./GoalItem/GoalItem";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateGoalDialog } from "./CreateGoalDialog/CreateGoalDialog";

export const Goals = async () => {
  const data = await getGoals();

  return (
    <div className={styles.goals}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Goal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Current amount</TableHead>
            <TableHead>Target amount</TableHead>
            <TableHead>Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </TableBody>
      </Table>
      <div className={styles.goalsBottom}>
        <CreateGoalDialog />
      </div>
    </div>
  );
};
