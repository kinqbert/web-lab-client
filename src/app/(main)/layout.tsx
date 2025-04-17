"use client";

import logo from "@/assets/general/logo.svg";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import styles from "./layout.module.css";

export default function MailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className={styles.content}>
      <nav className={styles.navbar}>
        <Link className={styles.logoWrapper} href="/dashboard">
          <Image className={styles.logo} src={logo} alt="Logo" />
          <span>iMoney</span>
        </Link>
        <div className={styles.links}>
          <Link
            href="/dashboard"
            className={`${styles.link} ${
              pathname === "/dashboard" ? styles.active : ""
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/transactions"
            className={`${styles.link} ${
              pathname === "/transactions" ? styles.active : ""
            }`}
          >
            Transactions
          </Link>
        </div>
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
