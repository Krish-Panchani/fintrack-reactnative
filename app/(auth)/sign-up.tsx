import * as React from "react";
import * as Haptics from "expo-haptics";
import { Href, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useAuth } from "@/context/AuthContext";
import { View, Alert } from "react-native";

export default function SignUpScreen() {
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { onRegister } = useAuth();

  const onSignUpPress = async () => {
    if (process.env.EXPO_OS === "ios") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    setIsLoading(true);

    try {
      console.log("register");

      // Check if passwords match
      if (password !== confirmPassword) {
        Alert.alert("Error", "Both passwords are different");
        return;
      }

      // Attempt to register the user
      const result = await onRegister!(emailAddress, password);

      const statusCode = result.status || 500; // Default to 500 if no status is provided

      // Handle different server responses
      if (statusCode === 201) {
        Alert.alert(
          "Success",
          "Your account registered successfully, Please login to continue"
        );
        router.replace("/(auth)");
      } else if (statusCode === 409) {
        // Email already exists
        Alert.alert(
          "Error",
          "Email already exists. Please use a different email."
        );
      } else if (statusCode === 400) {
        // Bad request or invalid data
        Alert.alert(
          "Error",
          "Invalid registration data. Please check your inputs."
        );
      } else if (statusCode === 500) {
        // Server error
        Alert.alert(
          "Error",
          "An error occurred on the server. Please try again later."
        );
      } else {
        // Generic fallback error
        Alert.alert("Error", "An unknown error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Registration error: ", err);
      Alert.alert("Error", "Failed to register. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (process.env.EXPO_OS === "ios") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setIsLoading(true);

    try {
      // Use the code the user provided to attempt verification
    } catch (error) {
      console.error("Verification error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <BodyScrollView contentContainerStyle={{ padding: 16 }}>
        <TextInput
          value={code}
          label={`Enter the verification code we sent to ${emailAddress}`}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <Button
          onPress={onVerifyPress}
          disabled={!code || isLoading}
          loading={isLoading}
        >
          Verify
        </Button>
      </BodyScrollView>
    );
  }

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
        placeholder="Enter email"
        keyboardType="email-address"
        onChangeText={(email) => setEmailAddress(email)}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput
        value={confirmPassword}
        placeholder="Confirm password"
        secureTextEntry={true}
        onChangeText={(password) => setConfirmPassword(password)}
      />
      <Button
        onPress={onSignUpPress}
        disabled={!emailAddress || !password || !confirmPassword || isLoading}
        loading={isLoading}
      >
        Continue
      </Button>
      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Already have an account?</ThemedText>
        <Button onPress={() => onNavigatePress("/(auth)")} variant="ghost">
          Sign In
        </Button>
      </View>
    </BodyScrollView>
  );
}
