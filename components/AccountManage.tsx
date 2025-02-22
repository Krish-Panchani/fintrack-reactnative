import { View, StyleSheet, Alert, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useAccounts } from "@/hooks/useAccounts";
import CustomText from "./ui/CustomText";
import { colors, size } from "@/constants/theme";
import Button from "./ui/button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Props = {};

const AccountManage = (props: Props) => {
  const {
    accounts = [], // Default to empty array if accounts are undefined
    accountLimit,
    isLoading,
    isError,
    handleDeleteAccount,
    handleSetDefaultAccount,
    handleUpdateAccountDetails,
  } = useAccounts();

  const [accountType, setAccountType] = useState("CURRENT");
  const [isCreating, setIsCreating] = useState(false);
  const [editingAccountId, setEditingAccountId] = useState<string | null>(null);
  const [editAccountName, setEditAccountName] = useState("");
  const [editBalance, setEditBalance] = useState<number | string>("");

  const [loadingState, setLoadingState] = useState<string | null>(null); // Track loading state per account

  const handleSaveChanges = (accountId: string) => {
    if (loadingState === accountId) return; // Prevent submitting if already loading
    setLoadingState(accountId); // Set loading state

    // Submit updated details (name, balance, type) for the account
    handleUpdateAccountDetails(
      accountId,
      editAccountName,
      Number(editBalance),
      accountType
    )
      .then(() => {
        Alert.alert(
          "Account Updated",
          "Your account details have been updated successfully."
        );
        setEditingAccountId(null); // Reset editing mode
      })
      .catch(() => {
        Alert.alert("Error", "There was an issue updating the account.");
      })
      .finally(() => setLoadingState(null)); // Reset loading state after update
  };

  const handleCancelEditing = () => {
    setEditingAccountId(null); // Reset to non-editing mode
  };

  const handleDeleteAccountWithToast = (accountId: string) => {
    handleDeleteAccount(accountId)
      .then(() => {
        Alert.alert(
          "Account Deleted",
          "The account has been deleted successfully."
        );
      })
      .catch(() => {
        Alert.alert("Error", "There was an issue deleting the account.");
      });
  };

  // Conditional Rendering for Loading or Error states
  if (isLoading) {
    return <ActivityIndicator />; // Show loading state
  }

  if (isError) {
    return <Text style={styles.loadingText}>Error loading accounts</Text>; // Show error state
  }

  return (
    <View style={styles.accountContainer}>
      <View style={styles.InfoContainer}>
        <CustomText
          fontSize={size.xl}
          color={colors.neutral200}
          paddingBottom={20}
        >
          Account Information
        </CustomText>

        {/* Ensure accounts is not empty before calling map */}
        {accounts.length === 0 ? (
          <Text style={styles.noAccountsText}>No accounts available</Text>
        ) : (
          accounts.map((account) => (
            <View key={account.id}>
              <View>
                <CustomText color={colors.neutral200}>
                  {account.name}
                </CustomText>
                <CustomText color={colors.neutral200}>
                  Type: {account.type}
                </CustomText>
                <CustomText color={colors.neutral200}>
                  Initial Balance: {account.balance}
                </CustomText>
              </View>
              <View style={styles.actionBtnWrapper}>
                <Button
                  onPress={() => handleSetDefaultAccount(account.id)}
                  loading={isLoading}
                  disabled={account.isDefault || loadingState === account.id}
                >
                  {loadingState === account.id
                    ? "Loading..."
                    : account.isDefault
                    ? "Default"
                    : "Set as Default"}
                </Button>
                <Button
                  onPress={() => handleDeleteAccount(account.id)}
                  disabled={account.isDefault || loadingState === account.id}
                  loading={isLoading}
                >
                  <Ionicons name="trash-bin" size={20} color={colors.rose} />
                </Button>
                <Button>
                  <Ionicons
                    name="pencil-outline"
                    size={20}
                    color={colors.white}
                  />
                </Button>
              </View>
            </View>
          ))
        )}
      </View>

      {accounts.length < accountLimit && !isLoading && (
        <Button
          onPress={() => router.push("/profile/createAccount")}
          textColor={colors.neutral200}
          style={{
            borderStyle: "dashed",
            borderWidth: 1,
            borderColor: colors.neutral500,
            borderRadius: 10,
          }}
        >
          Create New Account
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  InfoContainer: {
    backgroundColor: colors.neutral800,
    padding: 15,
    borderRadius: 12,
  },
  actionBtnWrapper: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    paddingTop: 20,
  },
  accountContainer: {
    gap: 20,
  },
  loadingText: {
    textAlign: "center",
    color: colors.neutral200,
    fontSize: size.lg,
  },
  noAccountsText: {
    textAlign: "center",
    color: colors.neutral200,
    fontSize: size.lg,
    paddingTop: 20,
  },
});

export default AccountManage;
