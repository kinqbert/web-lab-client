import { Goals } from "@/components/transactions/Goals/Goals";
import { Transactions } from "@/components/transactions/Transactions/Transactions";

import styles from "./styles.module.css";

export default function TransactionsBage() {
  return (
    <div className={styles.transactions}>
      <Goals />
      <Transactions />
    </div>
  );
}
