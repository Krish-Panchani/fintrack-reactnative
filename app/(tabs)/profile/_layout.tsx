import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ProfileLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          ...(process.env.EXPO_OS !== "ios"
            ? {}
            : {
                headerLargeTitle: true,
                headerTransparent: true,
                headerBlurEffect: "systemChromeMaterial",
                headerLargeTitleShadowVisible: false,
                headerShadowVisible: true,
                headerLargeStyle: {
                  // NEW: Make the large title transparent to match the background.
                  backgroundColor: "transparent",
                },
              }),
        }}
      >
        <Stack.Screen name="index" options={{ headerTitle: "Profile" }} />
        <Stack.Screen
          name="settings"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: [1],
            sheetGrabberVisible: true,
          }}
        />
        <Stack.Screen
          name="createAccount"
          options={{
            title: "Create new Account",
            presentation: "modal",
            sheetAllowedDetents: [1],
            sheetGrabberVisible: true,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
