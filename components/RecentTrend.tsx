import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors, size } from "@/constants/theme";
import CustomText from "./ui/CustomText";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Transaction } from "@/types/types";
import { useTransactions } from "@/hooks/useTransactions";
import SkeletonLoader from "./ui/SkeletonLoader";

type Props = {};

const RecentTrend = (props: Props) => {
  const { transactions, isLoading, error } = useTransactions();

  if (isLoading) return <SkeletonLoader size={{ width: 330, height: 60 }} />;
  const trend = getTransactionTrend(transactions);

  return (
    <View style={styles.trendContainer}>
      <CustomText fontSize={size.sm} fontWeight="bold" color={colors.white}>
        Recent Trend
      </CustomText>
      <Animated.View entering={FadeInDown.delay(500).duration(500)}>
        <View style={styles.trendTextWrapper}>
          {trend === "negative" && (
            <>
              <Ionicons
                name="trending-down"
                size={20}
                color={colors.negative}
              />
              <CustomText style={styles.trendText}>
                Your recent transaction shows more expense than income
              </CustomText>
            </>
          )}
          {trend === "positive" && (
            <>
              <Ionicons name="trending-up" size={20} color={colors.positive} />
              <CustomText style={styles.trendText}>
                Your recent transaction shows more income than expense
              </CustomText>
            </>
          )}
          {trend === "neutral" && (
            <>
              <Ionicons
                name="arrow-forward"
                size={20}
                color={colors.neutral600}
              />
              <CustomText style={styles.trendText}>
                Your recent income and expenses are balanced.
              </CustomText>
            </>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

// Function to calculate the trend based on transactions
const getTransactionTrend = (transactions: Transaction[]) => {
  const recentTransactions = transactions.slice(-5);

  const incomeTotal = recentTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenseTotal = recentTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, curr) => acc + curr.amount, 0);

  if (incomeTotal > expenseTotal) {
    return "positive";
  } else if (incomeTotal < expenseTotal) {
    return "negative";
  } else {
    return "neutral";
  }
};

const styles = StyleSheet.create({
  trendContainer: {
    gap: 8,
  },
  trendTextWrapper: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.background,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  trendText: {
    paddingHorizontal: 5,
  },
});
export default RecentTrend;
