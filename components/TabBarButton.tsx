import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { icon } from "@/constants/icons";
import { colors } from "@/constants/theme";

type Props = {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  label: string;
  routeName: string;
};

const TabBarButton = (props: Props) => {
  const { onPress, isFocused, label, onLongPress, routeName } = props;
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarBtn}
    >
      {icon[routeName]({
        color: isFocused ? colors.primary : colors.neutral400,
      })}
      <Text
        style={{
          color: isFocused ? colors.primary : colors.neutral400,
          fontSize: 12,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabbarBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
export default TabBarButton;
