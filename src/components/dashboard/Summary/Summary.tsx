import { getDashboardSummary } from "@/api/server/dashboard";

import styles from "./styles.module.css";

export const Summary = async () => {
  const data = await getDashboardSummary();

  const isPositive = data.balance > 0;

  return (
    <div className={styles.summary}>
      <div className={styles.summaryItem}>
        <span className={styles.summaryItemTitle}>Summary</span>
        <span className={styles.summaryItemValue}>
          {isPositive ? `+${data.balance}` : data.balance}
        </span>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.summaryItem}>
        <span className={styles.summaryItemTitle}>Expenses</span>
        <span className={styles.summaryItemValue}>{data.expenseMonth}</span>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.summaryItem}>
        <span className={styles.summaryItemTitle}>Income</span>
        <span className={styles.summaryItemValue}>{data.incomeMonth}</span>
      </div>
    </div>
  );
};
