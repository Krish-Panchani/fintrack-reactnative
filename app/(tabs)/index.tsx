import { useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, size } from "@/constants/theme";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Summary from "@/components/Summary";
import RecentTrend from "@/components/RecentTrend";
import RecentTransactions from "@/components/RecentTransactions";
import CustomText from "@/components/ui/CustomText";
import AddExpenseModal from "@/components/modals/AddTransactionModal";
import { useTransactions } from "@/hooks/useTransactions";
import React from "react";

export default function HomeScreen() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <SafeAreaView>
          <BodyScrollView
            contentContainerStyle={styles.container}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.header}>
              <View
                style={{ flexDirection: "row", gap: 8, alignItems: "baseline" }}
              >
                <CustomText color={colors.neutral400}>Hello,</CustomText>
                <CustomText
                  fontSize={size.xl}
                  fontWeight="700"
                  color={colors.white}
                >
                  Krish
                </CustomText>
              </View>

              <View>
                <TouchableOpacity
                  onPress={handlePresentModalPress}
                  style={styles.addExpenseBtn}
                >
                  <Ionicons name="add" size={22} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <Summary />
            <RecentTrend />
            {/* <RecentTransactions transactions={transactions} /> */}

            <BottomSheetModal
              ref={bottomSheetModalRef}
              onChange={handleSheetChanges}
              snapPoints={["65%", "80%"]}
            >
              <AddExpenseModal />
            </BottomSheetModal>

            <RecentTransactions />
          </BodyScrollView>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    marginVertical: 20,
    gap: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addExpenseBtn: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 50,
  },
});
