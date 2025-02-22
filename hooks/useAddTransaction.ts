import { Transaction } from "@/types/types";
import axios from "axios";

export const useAddTransaction = () => {
  const addTransaction = async (data: Transaction) => {
    console.log("[hook: useAddTransaction.ts: Adding transaction....]");
    try {
      await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/transaction`, data);
      console.log(`${data.type} transaction added successfully`);
    } catch (error) {
      console.error(`Error adding ${data.type} transaction:`, error);
      throw new Error(`Failed to add ${data.type} transaction`);
    }
  };

  return { addTransaction };
};
