export interface Transaction {
  _id: string;
  userId: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  description?: string;
  transactionDate: string;
}
