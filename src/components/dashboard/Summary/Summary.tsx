import { getDashboardSummary } from "@/api/server/dashboard";

import styles from "./styles.module.css";

export const Summary = async () => {
  const data = await getDashboardSummary();

  const getSummaryTextColor = () => {
    if (data.balance > 0) {
      return "text-green-600";
    } else if (data.balance < 0) {
      return "text-red-600";
    }

    return "";
  };

  const getSummaryText = () => {
    if (data.balance > 0) {
      return `+${data.balance}`;
    }

    return data.balance;
  };

  return (
    <div className={styles.summary}>
      <div className={styles.summaryItem}>
        <span className={styles.summaryItemTitle}>Summary</span>
        <span className={`${styles.summaryItemValue} ${getSummaryTextColor()}`}>
          {getSummaryText()}
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
