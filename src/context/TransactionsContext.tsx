import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface TransactionProps {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: any;
}

interface TransactionContextType {
  transactions: TransactionProps[];
  getTransaction: (query?: string) => Promise<void>;
  createTransaction: (data: CreateNewTransaction) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

interface CreateNewTransaction {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  async function getTransaction(query?: string) {
    const response = await api.get("/transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });
    setTransactions(response.data);
  }

  useEffect(() => {
    getTransaction();
  }, []);

  async function createTransaction(data: CreateNewTransaction) {
    const { description, price, category, type } = data;
    const response = await api.post("transactions", {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    });
    setTransactions((state) => [response.data, ...state]);
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, getTransaction, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
