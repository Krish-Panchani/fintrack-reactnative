import React from "react";
import * as Haptics from "expo-haptics";
import { Href, useRouter } from "expo-router";
import { View, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useAuth } from "@/context/AuthContext";

export default function SignIn() {
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  const { onLogin } = useAuth();

  const login = async () => {
    try {
      setIsSigningIn(true);
      const result = await onLogin!(emailAddress, password);

      console.log(result);
      // Check the status code in the response
      const statusCode = result?.status || 500;

      console.log(statusCode);
      if (statusCode === 200) {
        Alert.alert("Success", "Login successful!");
      } else if (statusCode === 401) {
        Alert.alert("Error", "Invalid email or password.");
      } else if (statusCode === 404) {
        Alert.alert("Error", "User not found. Please register.");
      } else if (statusCode === 409) {
        Alert.alert(
          "Error",
          "Email already exists. Please use a different email."
        );
      } else {
        // Unknown server error
        Alert.alert(
          "Error",
          "An unknown error occurred. Please try again later."
        );
      }
    } catch (error) {
      console.log("Login error: ", error);
      // Handle unexpected errors like network issues
      Alert.alert("Error", "Failed to log in. Please try again later.");
    } finally {
      setIsSigningIn(false);
    }
  };

  const onNavigatePress = React.useCallback(
    async (path: Href) => {
      if (process.env.EXPO_OS === "ios") {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      router.push(path);
    },
    [router]
  );

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        label="Email"
        keyboardType="email-address"
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        value={password}
        label="Password"
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button
        onPress={login}
        loading={isSigningIn}
        disabled={!emailAddress || !password || isSigningIn}
      >
        Sign in
      </Button>
      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Don't have an account?</ThemedText>
        <Button onPress={() => onNavigatePress("/sign-up")} variant="ghost">
          Sign up
        </Button>
      </View>
      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Forgot password?</ThemedText>
        <Button onPress={() => onNavigatePress("/(auth)")} variant="ghost">
          Reset password
        </Button>
      </View>
    </BodyScrollView>
  );
}
