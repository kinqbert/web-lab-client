import { Analytics } from "@/components/dashboard/Analytics/Analytics";
import { Expenses } from "@/components/dashboard/Expenses/Expenses";
import { Summary } from "@/components/dashboard/Summary/Summary";

import styles from "./styles.module.css";

export default function DashboardBage() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.left}>
        <Summary />
        <Expenses />
      </div>
      <div className={styles.right}>
        <Analytics />
      </div>
    </div>
  );
}
