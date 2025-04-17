import { getTransactions } from "@/api/server/transactions";
import { TransactionsTable } from "./TransactionsTable/TransactionsTable";

import styles from "./styles.module.css";
import { getGoals } from "@/api/server/goals";

export const Transactions = async () => {
  const transactions = await getTransactions();
  const goals = await getGoals();

  return (
    <div className={styles.transactions}>
      <TransactionsTable initialTransactions={transactions} goals={goals} />
    </div>
  );
};
