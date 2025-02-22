import { View, StyleSheet } from "react-native";
import React from "react";
import CustomText from "@/components/ui/CustomText";
import { colors, size } from "@/constants/theme";

type Props = {};

const analysis = (props: Props) => {
  return (
    <View style={styles.container}>
      <CustomText
        color={colors.neutral400}
        fontSize={size.xxl}
        fontWeight="700"
      >
        Analysis
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default analysis;
