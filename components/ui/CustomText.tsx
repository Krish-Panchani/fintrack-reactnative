import { colors } from "@/constants/theme";
import React from "react";
import { Text, StyleSheet, TextStyle, TextProps } from "react-native";

// Define the types for the props
interface CustomTextProps extends TextProps {
  fontSize?: number;
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  color?: string; // Custom color
  variantColor?: "primary" | "white" | "black"; // Predefined color variants
  padding?: number;
  margin?: number;
  paddingX?: number;
  paddingY?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  marginX?: number;
  marginY?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  style?: TextStyle | TextStyle[]; // To accept any additional styles passed from parent
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  fontSize,
  fontWeight,
  color,
  variantColor,
  padding,
  margin,
  paddingX,
  paddingY,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  marginX,
  marginY,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  style,
  ...rest
}) => {
  // Define color variants
  const colorVariants = {
    primary: colors.primary, // Example primary color
    white: "#ffffff",
    black: "#000000",
  };

  // Determine color based on color or variantColor prop
  const determinedColor = color || colorVariants[variantColor || "black"]; // Fallback to 'black' if no variantColor

  const customStyles: TextStyle = {
    fontSize,
    fontWeight,
    color: determinedColor,
    padding,
    margin,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
  };

  // Handling paddingX and paddingY
  if (paddingX) {
    customStyles.paddingHorizontal = paddingX;
  }

  if (paddingY) {
    customStyles.paddingVertical = paddingY;
  }

  // Handling marginX and marginY
  if (marginX) {
    customStyles.marginHorizontal = marginX;
  }

  if (marginY) {
    customStyles.marginVertical = marginY;
  }

  return (
    <Text style={[styles.defaultText, customStyles, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "System", // You can change this to a custom font if needed
  },
});

export default CustomText;
