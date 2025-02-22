import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextStyle,
  useColorScheme,
  ViewStyle,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo or react-icons
import { appleBlue, zincColors } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";

type ButtonVariant = "filled" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconName?: string; // Icon name for Ionicon
  iconSize?: number; // Icon size
  iconColor?: string; // Icon color
  iconPosition?: "left" | "right"; // Icon position (left or right of text)
  textSize?: number; // Text font size
  textColor?: string; // Text color
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  variant = "filled",
  size = "md",
  disabled = false,
  loading = false,
  children,
  style,
  textStyle,
  iconName,
  iconSize = 20, // Default size for the icon
  iconColor,
  iconPosition = "left", // Default position is left
  textSize = 16, // Default font size for text
  textColor,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const sizeStyles: Record<
    ButtonSize,
    { height: number; fontSize: number; padding: number }
  > = {
    sm: { height: 36, fontSize: 14, padding: 12 },
    md: { height: 44, fontSize: 16, padding: 16 },
    lg: { height: 55, fontSize: 18, padding: 20 },
  };

  const getVariantStyle = () => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    };

    switch (variant) {
      case "filled":
        return {
          ...baseStyle,
          backgroundColor: isDark ? zincColors[900] : zincColors[900],
        };
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: isDark ? zincColors[300] : zincColors[300],
        };
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
        };
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return isDark ? zincColors[400] : zincColors[400];
    }

    return (
      textColor ||
      (variant === "filled"
        ? isDark
          ? zincColors[50]
          : zincColors[50]
        : appleBlue)
    );
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        getVariantStyle(),
        {
          height: sizeStyles[size].height,
          paddingHorizontal: sizeStyles[size].padding,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {iconName && iconPosition === "left" && (
            <Ionicons
              name={iconName}
              size={iconSize}
              color={iconColor || getTextColor()}
              style={{ marginRight: 8 }}
            />
          )}
          <ThemedText
            style={StyleSheet.flatten([
              {
                fontSize: textSize,
                color: getTextColor(),
                textAlign: "center",
                marginBottom: 0,
                fontWeight: "700",
              },
              textStyle,
            ])}
          >
            {children}
          </ThemedText>
          {iconName && iconPosition === "right" && (
            <Ionicons
              name={iconName}
              size={iconSize}
              color={iconColor || getTextColor()}
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
      )}
    </Pressable>
  );
};

export default Button;
