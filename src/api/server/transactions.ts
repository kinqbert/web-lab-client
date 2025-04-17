import { Transaction } from "@/types/transactions";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export const getTransactions = async (params?: {
  type?: "income" | "expense";
  category?: string;
}): Promise<Transaction[]> => {
  return await fetchWithAuth("http://localhost:5050/transactions", { params });
};

export const createTransaction = async (payload: {
  amount: number;
  type: "income" | "expense";
  category: string;
  description?: string;
  transactionDate?: string; // ISO
  goalId?: string | null;
}) => {
  return await fetchWithAuth("http://localhost:5050/transactions", {
    method: "POST",
    body: payload,
  });
};
