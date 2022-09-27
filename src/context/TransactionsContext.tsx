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
  handleRemoveTransaction: (id: number) => void;
  handlePatchTransaction: (data: PatchTransaction) => void;
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
interface PatchTransaction {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
  transactionId: number;
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

  async function handleRemoveTransaction(id: number) {
    await api.delete(`/transactions/${id}`);
    const transaction = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(transaction);
  }

  async function handlePatchTransaction(data: PatchTransaction) {
    const { description, price, category, type, transactionId } = data;
    const response = await api.patch(`transactions/${transactionId}`, {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    });
    const transactionAtt = [...transactions];
    const transactionIndex = transactionAtt.findIndex(
      (transaction) => transaction.id === transactionId
    );
    transactionAtt[transactionIndex] = response.data;
    setTransactions(transactionAtt);
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        getTransaction,
        createTransaction,
        handleRemoveTransaction,
        handlePatchTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
