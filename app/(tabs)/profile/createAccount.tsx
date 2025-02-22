import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { AccountType } from "@/types/types";
import { Picker } from "@react-native-picker/picker";
import { colors, size } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "@/components/ui/text-input";
import Button from "@/components/ui/button";
import { useAccounts } from "@/hooks/useAccounts";
import { router } from "expo-router";

type Props = {};

const CreateNewAccountModal = (props: Props) => {
  const { accounts, accountLimit, isLoading, handleCreateAccount } =
    useAccounts();

  const [isCreating, setIsCreating] = useState(false);

  const [loadingState, setLoadingState] = useState<string | null>(null); // Track loading state per account

  const [accountName, setAccountName] = useState<string>(); // Amount input
  const [initialBal, setInitialBal] = useState<string>(); // Optional comment

  const [accountType, setAccountType] = useState<AccountType>(
    AccountType.SAVINGS
  );

  const accountTypes = [
    { label: "Saving", value: AccountType.SAVINGS },
    { label: "Current", value: AccountType.CURRENT },
  ];

  const handleCreateNewAccount = () => {
    if (!accountName || !initialBal || !accountType) {
      Alert.alert(
        "Validation Error",
        "Please fill in all fields to create the account."
      );
      return;
    }

    handleCreateAccount(accountName, accountType, Number(initialBal))
      .then(() => {
        Alert.alert(
          "Account Created",
          "Your new account has been created successfully."
        );
        setIsCreating(false); // Hide the create form
        setAccountName("");
        setInitialBal(""); // Reset the input fields
        router.back();
      })
      .catch(() => {
        Alert.alert("Error", "There was an issue creating the account.");
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Enter Account Name"
        value={accountName}
        onChangeText={(accountName) => setAccountName(accountName)} // Update amount state on change
      />

      {/* Comment Input */}
      <TextInput
        placeholder="Account Initial Balance"
        maxLength={10}
        value={initialBal}
        onChangeText={(ammount) => setInitialBal(ammount)} // Update comment state on change
        keyboardType="numeric"
      />

      {/* Category Picker */}
      <View style={styles.itemPicker}>
        <Picker
          selectedValue={accountType}
          onValueChange={(itemValue) => setAccountType(itemValue)}
          style={{ color: colors.neutral350 }}
        >
          {accountTypes.map((account) => (
            <Picker.Item
              key={account.value}
              label={account.label}
              value={account.value}
            />
          ))}
        </Picker>
      </View>

      {/* Add Expense Button */}
      <Button
        disabled={isLoading}
        loading={isLoading}
        variant="filled"
        onPress={handleCreateNewAccount}
      >
        Create Account
      </Button>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    gap: 8,
    paddingVertical: 15,
  },
  amountInput: {
    fontSize: size.xxl,
    fontWeight: "700",
  },
  inputField: {
    fontSize: size.xl,
  },
  itemPicker: {
    borderWidth: 1,
    borderColor: colors.neutral700,
    borderRadius: 15,
  },
});
export default CreateNewAccountModal;
