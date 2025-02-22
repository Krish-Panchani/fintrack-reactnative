import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, size } from "@/constants/theme";
import CustomText from "./ui/CustomText";
import { Transaction, TransactionType } from "@/types/types";
import { useTransactions } from "@/hooks/useTransactions";
import SkeletonLoader from "./ui/SkeletonLoader";
import { formatCurrency } from "@/helper/formatCurrency";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

// Define your icon mapping here based on category
const categoryIcons = {
  Utilities: "bulb",
  Salary: "cash",
  Groceries: "cart",
  Entertainment: "game-controller",
  Freelance: "briefcase",
  Food: "restaurant",
  Transport: "car",
  Shopping: "shirt",
  Gift: "gift",
  Investment: "wallet",
  Health: "heart",
  Rent: "home",
  Loan: "caret-up",
  Bonus: "trophy",
  Friend: "people", // Added Friend category
};

// List of predefined background colors to choose from
const backgroundColors = [
  "#cea800",
  "#00e4b1",
  "#ff6347",
  "#4682b4",
  "#ffa500",
  "#ff4500",
  "#8a2be2",
  "#32cd32",
  "#ff1493",
  "#2e8b57",
  "#ff69b4",
  "#8b0000",
  "#b22222",
  "#ffd700",
  "#a52a2a",
];

const getRandomBackgroundColor = () => {
  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  return backgroundColors[randomIndex];
};

const RecentTransactions = () => {
  const { transactions, isLoading, deleteTransaction } = useTransactions();
  const [prevOpenedRow, setPrevOpenedRow] = useState<any>(null);
  const rowRefs = useRef<Array<any>>([]);

  useEffect(() => {
    // Resize ref array to match the number of transactions
    rowRefs.current = rowRefs.current.slice(0, transactions.length);
  }, [transactions]);

  if (isLoading) {
    return <SkeletonLoader count={5} />;
  }

  const handleDelete = (id: string, index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const transaction = transactions[index]; // Get the transaction by index
    const amountFormatted =
      transaction.type === TransactionType.EXPENSE
        ? `- ${formatCurrency(Math.abs(transaction.amount))}`
        : `+ ${formatCurrency(transaction.amount)}`;

    // Show a confirmation alert before deleting
    Alert.alert(
      "Delete Transaction",
      `Are you sure you want to delete this transaction?\n\nCategory: ${
        transaction.category
      }\nDescription: ${
        transaction.description || "No description"
      }\nAmount: ${amountFormatted}\nDate: ${new Date(
        transaction.date
      ).toLocaleDateString()}`,
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => setPrevOpenedRow(null),
        },
        {
          text: "Delete",
          onPress: () => {
            deleteTransaction(id);
            setPrevOpenedRow(null); // Close the swipeable after deletion
          },
          style: "destructive",
        },
      ]
    );
  };

  const closeAllRows = () => {
    rowRefs.current.forEach((row) => row?.close()); // Close all swipeable rows
  };

  // const closeRow = (index: number) => {
  //   if (prevOpenedRow && prevOpenedRow !== rowRefs.current[index]) {
  //     prevOpenedRow.close();
  //   }
  //   setPrevOpenedRow(rowRefs.current[index]); // Update the reference to the currently opened row
  // };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <CustomText fontSize={size.sm} fontWeight="700" color={colors.white}>
          Recent Transactions
        </CustomText>

        {transactions.map((item: Transaction, index: number) => {
          const categoryIcon = categoryIcons[item.category] || "document";
          const randomBackgroundColor = getRandomBackgroundColor();

          return (
            <ReanimatedSwipeable
              key={item.id}
              ref={(ref) => (rowRefs.current[index] = ref)} // Store the reference to each row
              onSwipeableWillOpen={() => {
                handleDelete(item.id, index);
                closeAllRows(); // Close all rows before opening the current one
                // closeRow(index); // Open the current row
              }}
              friction={2}
              leftThreshold={30}
              rightThreshold={40}
              renderRightActions={() => (
                <View style={styles.deleteButton}>
                  <CustomText
                    onPress={() => handleDelete(item.id, index)}
                    style={styles.deleteText}
                  >
                    Delete
                  </CustomText>
                </View>
              )}
            >
              <Animated.View
                style={styles.tnxWrapper}
                entering={FadeInDown.delay(600 + index * 100).duration(500)}
              >
                <View style={styles.tnxInfoWrapper}>
                  <Ionicons
                    name={categoryIcon}
                    size={20}
                    style={[
                      styles.tnxIcon,
                      { backgroundColor: randomBackgroundColor },
                    ]}
                  />
                  <View style={styles.tnxInfo}>
                    <CustomText color={colors.white}>
                      {item.category}
                    </CustomText>
                    <CustomText color={colors.neutral400}>
                      {item.description || "No description"}
                    </CustomText>
                  </View>
                </View>
                <View style={styles.tnxAmmountDate}>
                  <CustomText
                    color={
                      item.type === TransactionType.EXPENSE
                        ? colors.rose
                        : colors.green
                    }
                  >
                    {item.type === TransactionType.EXPENSE
                      ? `- ${formatCurrency(Math.abs(item.amount))}`
                      : `+ ${formatCurrency(item.amount)}`}
                  </CustomText>
                  <CustomText color={colors.neutral400}>
                    {new Date(item.date).toLocaleDateString()}
                  </CustomText>
                </View>
              </Animated.View>
            </ReanimatedSwipeable>
          );
        })}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingBottom: 10,
  },
  tnxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.neutral800,
    padding: 10,
    borderRadius: 15,
  },
  tnxInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tnxIcon: {
    color: colors.white,
    padding: 10,
    borderRadius: 12,
  },
  tnxInfo: {},
  tnxAmmountDate: {
    alignItems: "flex-end",
  },

  // Styles for the swipeable delete button
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 10,
    padding: 10,
  },
  deleteText: {
    color: colors.rose,
    fontWeight: "bold",
  },
});

export default RecentTransactions;
