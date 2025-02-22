import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet } from "react-native";

export const icon = {
  index: ({ color }: { color: string }) => (
    <Ionicons name="home-outline" size={22} color={color} />
  ),
  analysis: ({ color }: { color: string }) => (
    <Ionicons name="stats-chart" size={22} color={color} />
  ),
  trips: ({ color }: { color: string }) => (
    <Ionicons name="car-sport" size={22} color={color} />
  ),
  accounts: ({ color }: { color: string }) => (
    <Ionicons name="wallet" size={22} color={color} />
  ),
  profile: () => (
    <Image
      source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=male" }}
      style={styles.userImg}
    />
  ),
};

const styles = StyleSheet.create({
  userImg: {
    height: 24,
    width: 24,
    borderRadius: 20,
  },
});
