import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "@/components/ui/CustomText";
import { colors, size } from "@/constants/theme";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import AccountManage from "@/components/AccountManage";
import { StatusBar } from "expo-status-bar";

type Props = {};

const Settings = (props: Props) => {
  const [account, setAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      const getProfile = async () => {
        const result = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/account`
        );
        setAccount(result.data);
        console.log("Account", account);
      };
      getProfile();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <CustomText
            fontSize={size.xxl}
            fontWeight="700"
            color={colors.neutral200}
          >
            Settings
          </CustomText>
          <AccountManage />
          <View style={styles.DangerZoneContainer}>
            <CustomText
              fontSize={size.xl}
              color={colors.negative}
              paddingBottom={20}
            >
              Danger Zone
            </CustomText>
            <View style={styles.dangerZoneWrapper}>
              <CustomText color={colors.neutral200}>
                This action cannot be undone. All your data will be permanently
                deleted. Please be certain.
              </CustomText>
              <Button
                style={styles.deleteAcBtn}
                iconName="trash-bin"
                iconColor={colors.rose}
              >
                Delete Account
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 20,
  },

  DangerZoneContainer: {
    backgroundColor: colors.neutral800,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.rose,
    borderRadius: 12,
  },
  dangerZoneWrapper: {
    gap: 20,
  },
  deleteAcBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
export default Settings;
