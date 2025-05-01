"use client";

import { useMemo, useState } from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Transaction } from "@/types/transactions";
import { Goal } from "@/types/goals";
import { CreateTransactionDialog } from "./CreateTransactionDialog/CreateTransactionDialog";

interface Props {
  initialTransactions: Transaction[];
  goals: Goal[];
}

enum TRANSACTION_TYPE {
  ALL = "all",
  INCOME = "income",
  EXPENSE = "expense",
}

type SortKey = "date-desc" | "date-asc" | "amount-desc" | "amount-asc";

export const TransactionsTable = ({ initialTransactions, goals }: Props) => {
  const [type, setType] = useState<TRANSACTION_TYPE>(TRANSACTION_TYPE.ALL);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("date-desc");
  const [search, setSearch] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(initialTransactions.map((t) => t.category))),
    [initialTransactions]
  );

  const rows = useMemo(() => {
    let data = [...initialTransactions];

    if (type !== TRANSACTION_TYPE.ALL)
      data = data.filter((t) => t.type === type);
    if (category !== "all") data = data.filter((t) => t.category === category);
    if (search)
      data = data.filter(
        (t) =>
          t.description?.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase())
      );

    data.sort((a, b) => {
      if (sort.startsWith("date")) {
        return sort === "date-asc"
          ? new Date(a.transactionDate).getTime() -
              new Date(b.transactionDate).getTime()
          : new Date(b.transactionDate).getTime() -
              new Date(a.transactionDate).getTime();
      } else {
        return sort === "amount-asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
    });

    return data;
  }, [initialTransactions, type, category, sort, search]);

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Select
            value={type}
            onValueChange={(v) => setType(v as TRANSACTION_TYPE)}
          >
            <SelectTrigger className="w-32">
              <SelectValue>{type === "all" ? "All types" : type}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-48">
              <SelectValue>
                {category === "all" ? "All categories" : category}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="w-40">
              <SelectValue>Sort</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Date ⬇</SelectItem>
              <SelectItem value="date-asc">Date ⬆</SelectItem>
              <SelectItem value="amount-desc">Amount ⬇</SelectItem>
              <SelectItem value="amount-asc">Amount ⬆</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Search…"
            className="max-w-[200px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            className="h-full"
            variant="ghost"
            onClick={() => {
              setType(TRANSACTION_TYPE.ALL);
              setCategory("all");
              setSort("date-desc");
              setSearch("");
            }}
          >
            Reset
          </Button>
        </div>

        <CreateTransactionDialog goals={goals} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id} className="h-[36px]">
              <td>{fmtDate(row.transactionDate)}</td>
              <td>{row.category}</td>
              <td>
                <Badge
                  variant={row.type === "income" ? "secondary" : "destructive"}
                >
                  {row.type}
                </Badge>
              </td>
              <td>{row.description ?? "-"}</td>
              <td className="text-right">
                {row.type === "expense" ? "-" : "+"}${row.amount.toFixed(2)}
              </td>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {rows.length === 0 && (
        <p className="text-muted-foreground text-sm">No transactions found.</p>
      )}
    </div>
  );
};
