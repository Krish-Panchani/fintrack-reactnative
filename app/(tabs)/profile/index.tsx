import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "@/components/ui/CustomText";
import { colors, size } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const profile = () => {
  const { onLogout } = useAuth();
  const [profile, setProfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      const getProfile = async () => {
        const result = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/user`
        );
        setProfile(result.data);
        console.log("profile", profile);
      };
      getProfile();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <View style={styles.container}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: profile?.imageUrl }} style={styles.userImg} />
          <CustomText
            color={colors.neutral400}
            fontSize={size.xl}
            fontWeight="700"
          >
            {profile?.firstName}
          </CustomText>
          <CustomText color={colors.neutral400} fontSize={size.sm}>
            {profile?.emailAddress}
          </CustomText>
        </View>
        <View style={styles.optionsContainer}>
          <Animated.View entering={FadeInDown.delay(300).duration(300)}>
            <TouchableOpacity
              style={styles.optionsWrapper}
              onPress={() => {
                // Handle Edit Profile press here
                router.push("/profile");
              }}
            >
              <Ionicons
                name="person"
                size={20}
                style={[styles.optionsIcon, { backgroundColor: "#574ade" }]}
              />
              <CustomText color={colors.neutral300} fontSize={size.base}>
                Edit Profile
              </CustomText>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(300)}>
            <TouchableOpacity
              style={styles.optionsWrapper}
              onPress={() => {
                // Handle Settings press here
                router.push("/(tabs)/profile/settings");
              }}
            >
              <Ionicons
                name="settings"
                size={20}
                style={[styles.optionsIcon, { backgroundColor: "#2bb1fe" }]}
              />
              <CustomText color={colors.neutral300} fontSize={size.base}>
                Settings
              </CustomText>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(500).duration(300)}>
            <TouchableOpacity
              style={styles.optionsWrapper}
              onPress={() => {
                // Handle Privacy Policy press here
                router.push("/profile");
              }}
            >
              <Ionicons
                name="lock-closed"
                size={20}
                style={[styles.optionsIcon, { backgroundColor: "#323a39" }]}
              />
              <CustomText color={colors.neutral300} fontSize={size.base}>
                Privacy Policy
              </CustomText>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(600).duration(300)}>
            <TouchableOpacity style={styles.optionsWrapper} onPress={onLogout}>
              <Ionicons
                name="log-out"
                size={20}
                style={[styles.optionsIcon, { backgroundColor: "#c43939" }]}
              />
              <CustomText color={colors.neutral300} fontSize={size.base}>
                Logout
              </CustomText>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View style={{ alignSelf: "center" }}>
          <CustomText color={colors.neutral500}>Version 1.0.0</CustomText>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
  },

  profileInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  optionsContainer: {
    paddingVertical: 10,
    gap: 20,
  },
  optionsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  optionsIcon: {
    backgroundColor: "#6658ff",
    color: colors.white,
    padding: 10,
    borderRadius: 12,
  },
});

export default profile;
