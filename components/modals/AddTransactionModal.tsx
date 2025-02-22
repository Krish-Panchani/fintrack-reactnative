import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { colors, size } from "@/constants/theme";
import { Picker } from "@react-native-picker/picker";
import Button from "../ui/button";
import {
  PaymentMode,
  Transaction,
  TransactionStatus,
  TransactionType,
} from "@/types/types";
import { useTransactions } from "@/hooks/useTransactions";

const AddExpenseModal = () => {
  const [amount, setAmount] = useState<string>(); // Amount input
  const [comment, setComment] = useState<string>(""); // Optional comment
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    "Food"
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMode>(PaymentMode.UPI);

  const [selectedtransactionType, setSelectedTransactionType] =
    useState<TransactionType>(TransactionType.EXPENSE);

  const { addTransaction } = useTransactions();
  const { dismiss } = useBottomSheetModal();

  // Dynamic data for categories and payment methods
  const expenseCategories = [
    { label: "Food", value: "Food" },
    { label: "Transportation", value: "Transportation" },
    { label: "Entertainment", value: "Entertainment" },
    { label: "Bills", value: "Bills" },
    { label: "Shopping", value: "Shopping" },
    { label: "Health", value: "Health" },
  ];

  const paymentMethods = [
    { label: "UPI", value: PaymentMode.UPI },
    { label: "Bank Transfer", value: PaymentMode.BANK_TRANSFER },
    { label: "Credit Card", value: PaymentMode.CARD },
    { label: "Debit Card", value: PaymentMode.CARD }, // Assuming Debit Card uses the same enum value as "CARD"
    { label: "Cash", value: PaymentMode.CASH },
  ];

  const transactionTypes = [
    { label: "Expense", value: TransactionType.EXPENSE },
    { label: "Income", value: TransactionType.INCOME },
  ];

  // Handle submit form (optimistic update)
  const handleSubmit = async () => {
    // 1. Create an optimistic transaction object
    const optimisticTransaction: Transaction = {
      amount: parseFloat(amount!),
      description: comment || "",
      date: new Date(),
      category: selectedCategory!,
      receiptUrl: "",
      paymentMode: selectedPaymentMethod,
      type: selectedtransactionType,
      status: TransactionStatus.COMPLETED,
      isRecurring: false,
      recurringInterval: null,
      nextRecurringDate: null,
      lastProcessedDate: null,
    };

    console.log("[modal: addExpense]: optimistic ui:", optimisticTransaction);
    addTransaction(optimisticTransaction);
    dismiss();
  };

  return (
    <BottomSheetView style={styles.modalContainer}>
      {/* Amount Input */}
      <BottomSheetTextInput
        placeholder="Enter Amount"
        style={styles.amountInput}
        keyboardType="numeric"
        value={amount}
        maxLength={10}
        onChangeText={(amount) => setAmount(amount)} // Update amount state on change
      />

      {/* Comment Input */}
      <BottomSheetTextInput
        placeholder="Comment (Optional)"
        style={styles.inputField}
        value={comment}
        onChangeText={setComment} // Update comment state on change
      />

      {/* Category Picker */}
      <View style={styles.itemPicker}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          {expenseCategories.map((category) => (
            <Picker.Item
              key={category.value}
              label={category.label}
              value={category.value}
            />
          ))}
        </Picker>
      </View>

      {/* Payment Method Picker */}
      <View style={styles.itemPicker}>
        <Picker
          selectedValue={selectedPaymentMethod}
          onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
        >
          {paymentMethods.map((method) => (
            <Picker.Item
              key={method.value}
              label={method.label}
              value={method.value}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.itemPicker}>
        <Picker
          selectedValue={selectedtransactionType}
          onValueChange={(itemValue) => setSelectedTransactionType(itemValue)}
        >
          {transactionTypes.map((method) => (
            <Picker.Item
              key={method.value}
              label={method.label}
              value={method.value}
            />
          ))}
        </Picker>
      </View>

      {/* Add Expense Button */}
      <Button variant="filled" onPress={handleSubmit}>
        Add Transaction
      </Button>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
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

export default AddExpenseModal;
