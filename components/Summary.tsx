import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "./ui/CustomText";
import { colors, size } from "@/constants/theme";
import Animated, { FadeInDown } from "react-native-reanimated";
import { PieChart } from "react-native-gifted-charts";
import { useSummary } from "@/hooks/useSummary";
import SkeletonLoader from "./ui/SkeletonLoader";
import { formatCurrency } from "@/helper/formatCurrency";

const pieData = [
  {
    value: 47,
    color: "#f15a5a",
    focused: true,
    text: "47%",
  },
  {
    value: 40,
    color: "#f1b75a",
    text: "40%",
  },
  {
    value: 16,
    color: "#5a94f1",
    text: "16%",
  },
  { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97", text: "3%" },
];

const Summary = () => {
  const {
    summary,
    loading: summaryLoading,
    error: summaryError,
    mutate: updateSummaryData,
  } = useSummary();

  const handleTagPress = (tag: string) => {
    // Handle tag press action here
    console.log(`${tag} clicked`);
  };

  if (summaryLoading) {
    return <SkeletonLoader size={{ width: 320, height: 200 }} />;
  }

  const { income, expense, initial_balance } = summary || {
    income: { daily: 0, weekly: 0, monthly: 0, total: 0 },
    expense: { daily: 0, weekly: 0, monthly: 0, total: 0 },
    initial_balance: { balance: 0 },
  };

  const netBalance = {
    total:
      (income?.total || 0) -
      (expense?.total || 0) +
      (initial_balance?.balance || 0),
  };

  return (
    <View style={styles.summaryContainer}>
      <View>
        <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
          <View style={styles.tagsWrapper}>
            <TouchableOpacity
              style={[styles.tags, { backgroundColor: colors.primary }]}
              onPress={() => handleTagPress("All Time")}
            >
              <CustomText
                fontSize={size.sm}
                fontWeight="bold"
                color={colors.white}
              >
                All Time
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tags}
              onPress={() => handleTagPress("Today")}
            >
              <CustomText
                fontSize={size.sm}
                fontWeight="bold"
                color={colors.white}
              >
                Today
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tags}
              onPress={() => handleTagPress("Monthly")}
            >
              <CustomText
                fontSize={size.sm}
                fontWeight="bold"
                color={colors.white}
              >
                Monthly
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tags}
              onPress={() => handleTagPress("Yearly")}
            >
              <CustomText
                fontSize={size.sm}
                fontWeight="bold"
                color={colors.white}
              >
                Yearly
              </CustomText>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Animated.View
          style={styles.netbalanceContainer}
          entering={FadeInDown.delay(300).duration(500)}
        >
          <View style={styles.netbalanceWrapper}>
            <View>
              <CustomText
                fontSize={size.sm}
                color={colors.black}
                fontWeight="600"
              >
                Total Balance
              </CustomText>
              <CustomText
                fontSize={size.xxl}
                fontWeight="bold"
                color={colors.black}
              >
                {formatCurrency(netBalance.total)}
              </CustomText>
            </View>
            <View style={{ paddingVertical: 10, alignItems: "center" }}>
              <PieChart
                data={pieData}
                donut
                showGradient
                sectionAutoFocus
                // focusOnPress
                semiCircle
                radius={60}
                innerRadius={50}
                innerCircleColor={colors.black}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        47%
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.expenseIncomeContainer}>
            <View style={styles.expenseContainer}>
              <View style={styles.expenseWrapper}>
                <Ionicons
                  name="arrow-down"
                  size={18}
                  style={styles.expenseIcon}
                />
                <Text>Expense</Text>
              </View>
              <CustomText
                fontSize={size.xl}
                fontWeight="700"
                color={colors.negative}
              >
                {formatCurrency(expense.total)}
              </CustomText>
            </View>
            <View style={styles.expenseContainer}>
              <View style={styles.expenseWrapper}>
                <Ionicons
                  name="arrow-up"
                  size={18}
                  style={styles.expenseIcon}
                />
                <Text>Income</Text>
              </View>
              <CustomText
                fontSize={size.xl}
                fontWeight="700"
                color={colors.positive}
              >
                {formatCurrency(income.total)}
              </CustomText>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    gap: 10,
  },
  netbalanceContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginVertical: 10,
  },
  netbalanceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  expenseIncomeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 20,
  },

  expenseContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  expenseWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  expenseIcon: {
    backgroundColor: colors.extraLightGray,
    padding: 5,
    borderRadius: 20,
  },
  tagsWrapper: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  tags: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default Summary;
