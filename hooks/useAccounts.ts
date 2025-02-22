import useSWR, { mutate } from "swr";
import axios from "axios";
import { Account, AccountType } from "../types/types";
import { useState } from "react";

// Fetcher function for SWR
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useAccounts = () => {
  const {
    data: accounts,
    error,
    isLoading,
  } = useSWR<Account[]>(
    `${process.env.EXPO_PUBLIC_API_URL}/account`, // URL to fetch accounts
    fetcher,
    {
      revalidateOnFocus: false, // Disable revalidation when refocused
      dedupingInterval: 60000, // Prevent deduplication within 60 seconds
    }
  );

  console.log(accounts);

  const [accountLimit, setAccountLimit] = useState(2);

  // Handle creating a new account
  const handleCreateAccount = async (
    newAccountName: string,
    accountType: string,
    accountBalance: number
  ) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/account`,
        {
          name: newAccountName,
          type: accountType,
          balance: accountBalance,
        }
      );

      // After creating the new account, trigger SWR revalidation
      mutate(`${process.env.EXPO_PUBLIC_API_URL}/account`);
    } catch (error) {
      console.error("Error creating account", error);
    }
  };

  // Handle deleting an account
  const handleDeleteAccount = async (accountId: string) => {
    try {
      await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/account`, {
        data: { accountId },
      });

      // After deleting the account, trigger SWR revalidation
      mutate(`${process.env.EXPO_PUBLIC_API_URL}/account`);
    } catch (error) {
      console.error("Error deleting account", error);
    }
  };

  // Handle setting a default account
  const handleSetDefaultAccount = async (accountId: string) => {
    try {
      await axios.patch(
        `${process.env.EXPO_PUBLIC_API_URL}/account/set-default`,
        { accountId }
      );

      // Optimistically update the account in the state and trigger revalidation
      mutate(`${process.env.EXPO_PUBLIC_API_URL}/account`);
    } catch (error) {
      console.error("Error setting default account", error);
    }
  };

  // Handle updating account details
  const handleUpdateAccountDetails = async (
    accountId: string,
    name: string,
    balance: number,
    type: string
  ) => {
    try {
      await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/account`, {
        accountId,
        name,
        balance,
        type,
      });

      // After updating, trigger revalidation
      mutate(`${process.env.EXPO_PUBLIC_API_URL}/account`);
    } catch (error) {
      console.error("Error updating account details", error);
    }
  };

  return {
    accounts,
    accountLimit,
    isLoading,
    isError: error,
    handleCreateAccount,
    handleDeleteAccount,
    handleSetDefaultAccount,
    handleUpdateAccountDetails,
  };
};
