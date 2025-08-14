import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function InitialLayout() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn !== undefined) {
      router.replace(isSignedIn ? "/(tabs)" : "/(auth)/login"); 
    }
  }, [isSignedIn]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={{ color: "#fff", marginTop: 10 }}>Loading...</Text>
    </View>
  );
}
