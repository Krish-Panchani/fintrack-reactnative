import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, size } from "@/constants/theme";
import CustomText from "./ui/CustomText";
import { dummyTransactions } from "@/data/data";
import { Transaction } from "@/types/types";
import Animated, { FadeInDown } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    // console.log("showRightProgress:", prog.value);
    // console.log("appliedTranslation:", drag.value);

    return {
      transform: [{ translateX: drag.value + 30 }],
      alignSelf: "center",
      paddingVertical: 15,
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Ionicons name="trash" size={22} color={colors.rose} />
    </Reanimated.View>
  );
}

const RecentTransactions = () => {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <CustomText fontSize={size.sm} fontWeight="700" color={colors.white}>
          Recent Transactions
        </CustomText>

        {/* Mapping over dummyTransactions to render each transaction */}
        <View style={styles.tnxContainer}>
          {dummyTransactions.map((item: Transaction, index: number) => (
            <ReanimatedSwipeable
              key={index}
              containerStyle={styles.swipeable}
              friction={2}
              enableTrackpadTwoFingerGesture
              rightThreshold={10}
              renderRightActions={RightAction}
            >
              <Animated.View
                style={styles.tnxWrapper}
                entering={FadeInDown.delay(500 + index * 100).duration(500)}
              >
                <View style={styles.tnxInfoWrapper}>
                  <Ionicons
                    name={item.category.icon}
                    size={20}
                    style={[
                      styles.tnxIcon,
                      { backgroundColor: item.category.backgroundColor },
                    ]}
                  />
                  <View style={styles.tnxInfo}>
                    <CustomText color={colors.white}>
                      {item.category.name}
                    </CustomText>
                    <CustomText color={colors.neutral400}>
                      {item.description}
                    </CustomText>
                  </View>
                </View>
                <View style={styles.tnxAmmountDate}>
                  <CustomText
                    color={item.type === "expense" ? colors.green : colors.rose}
                  >
                    {item.type === "expense"
                      ? `-$${Math.abs(item.amount)}`
                      : `+$${item.amount}`}
                  </CustomText>
                  <CustomText color={colors.neutral400}>{item.date}</CustomText>
                </View>
              </Animated.View>
            </ReanimatedSwipeable>
          ))}
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  tnxContainer: {
    gap: 10,
    marginBottom: 20,
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
});

export default RecentTransactions;
