import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import ClerkAndConvexProvider from "@/provider/ClerkAndConvexProvider";
import useAutoLogin from "./hooks/useAutoLogin";

export default function RootLayout() {
  return (
    <ClerkAndConvexProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
          <AutoLoginWrapper />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkAndConvexProvider>
  );
}

// Custom wrapper to ensure useAutoLogin is called after ClerkProvider is mounted
function AutoLoginWrapper() {
  useAutoLogin();
  return <Slot />;
}
