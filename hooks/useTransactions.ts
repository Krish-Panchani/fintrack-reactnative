import useSWRInfinite from "swr/infinite";
import axios from "axios";
import { useSummary } from "./useSummary";
import { useAddTransaction } from "./useAddTransaction";
import {
  defaultSummaryWithExpense,
  updateSummary,
} from "@/helper/summaryHelpers";
import { Transaction, TransactionType } from "@/types/types";

// Fetcher function for SWR
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useTransactions() {
  const {
    loading: summaryLoading,
    error: summaryError,
    mutate: updateSummaryData,
    refetchSummary,
  } = useSummary();

  const { addTransaction: add } = useAddTransaction();

  const take = 10; // Number of items per page

  // Using useSWRInfinite for pagination
  const { data, error, mutate, isValidating, setSize } = useSWRInfinite(
    (index) =>
      `${process.env.EXPO_PUBLIC_API_URL}/transaction?skip=${
        index * take
      }&take=${take}`,
    fetcher,
    {
      revalidateOnFocus: false, // Disable revalidation when tab refocuses
      dedupingInterval: 60000, // Deduplicate requests for 60 seconds
      keepPreviousData: true, // Keeps previous data while loading more
    }
  );

  // Checking if data is loading
  const isLoading = !data && !error;

  // Checking if there's more data to load (when data length is equal to the requested `take`)
  const hasMore = data?.[data.length - 1]?.length === take;

  // Flattening the data from all pages
  const transactions = data ? [].concat(...data) : [];

  // Load more data when the user clicks "Load More"
  const loadMore = () => {
    if (isValidating || !hasMore) return; // Prevents loading more if already loading or no more data
    setSize((prev) => prev + 1); // Increases the number of pages to load
  };

  // Adding a new transaction (optimistic update)
  const addTransaction = async (newTransaction: Transaction) => {
    if (newTransaction.type === TransactionType.EXPENSE) {
      console.log("[hook: useTransactions.ts] - Expense summary updated..");
      updateSummaryData((prev) => {
        if (!prev) return defaultSummaryWithExpense(newTransaction.amount);
        return updateSummary(prev, newTransaction.amount, "expense");
      }, false); // Prevent mutate/revalidation here
    } else {
      updateSummaryData((prev) => {
        if (!prev) return defaultSummaryWithExpense(newTransaction.amount);
        return updateSummary(prev, newTransaction.amount, "income");
      }, false); // Prevent mutate/revalidation here
    }

    console.log("[hook: useTransactions.ts] - adding..");
    await add(newTransaction);
    mutate((prev) => [newTransaction, ...(prev || [])], false); // Update local cache optimistically
  };

  const deleteTransaction = async (transactionId: string) => {
    try {
      // Optimistically update the local state to remove the transaction
      mutate((prev) => {
        if (prev) {
          return prev.filter(
            (transaction: Transaction) => transaction.id !== transactionId
          );
        }
        return []; // Fallback to empty array if prev is undefined
      }, false);

      // Make the actual DELETE request to the API
      await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/transaction`, {
        data: { id: transactionId },
      });

      // After successful deletion, refetch the data to ensure the transaction is removed from the backend
      mutate(); // This will refetch the data to reflect the server state
      refetchSummary(); // Refetch the summary to update the balance
    } catch (error) {
      console.error("[DELETE_TRANSACTION]", error);

      // If the deletion fails, we can revert the optimistic update by refetching the data
      mutate(); // Refetch the data in case of failure
      refetchSummary(); // Refetch the summary to update the balance
    }
  };
  return {
    transactions,
    error,
    isLoading,
    loadMore,
    isLoadingMore: isValidating,
    hasMore,
    addTransaction,
    deleteTransaction,
    mutate,
  };
}
