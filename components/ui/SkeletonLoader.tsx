import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/constants/theme";

const { width } = Dimensions.get("window");

// SkeletonLoader Component (customizable)
const SkeletonLoader = ({
  shape = "rectangle", // Shape: 'rectangle' or 'circle'
  size = { width: 320, height: 50 }, // Size: { width, height }
  count = 1, // Number of skeleton elements
  borderRadius = 10, // Border radius for roundness (applies to rectangle and circle)
  animationSpeed = 1000, // Speed of shimmer animation (in ms)
}) => {
  const translateX = new Animated.Value(-width); // Start from off-screen (left)

  useEffect(() => {
    // Start the animation to move the gradient from left to right
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width, // Move it to the right
        duration: animationSpeed,
        useNativeDriver: true, // Optimize with native driver for better performance
      })
    ).start();
  }, [animationSpeed]);

  // Function to create a single skeleton item
  const renderSkeletonItem = (index: any) => {
    const maskStyle =
      shape === "circle"
        ? { ...styles.mask, borderRadius: size.width / 2 }
        : { ...styles.mask, ...size, borderRadius };

    return (
      <MaskedView
        key={index}
        style={[styles.skeleton, size]} // Ensure size is applied here
        maskElement={<View style={maskStyle} />}
      >
        <Animated.View
          style={[
            styles.gradientWrapper,
            { transform: [{ translateX }] }, // Apply the animated gradient translation
          ]}
        >
          <LinearGradient
            colors={[colors.neutral900, colors.neutral700, colors.neutral800]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.2, 0.5, 0.8]} // Adjust shimmer location for more dynamic effect
          />
        </Animated.View>
      </MaskedView>
    );
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: count }, (_, index) => renderSkeletonItem(index))}
    </View>
  );
};

// Styles for the skeleton loader
const styles = StyleSheet.create({
  container: {
    flexDirection: "column", // Stacks the skeletons vertically
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  skeleton: {
    marginBottom: 15,
    overflow: "hidden", // Ensure the gradient doesn't overflow
    backgroundColor: colors.neutral800,
  },
  gradientWrapper: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  mask: {
    backgroundColor: "#e0e0e0",
  },
});

export default SkeletonLoader;
