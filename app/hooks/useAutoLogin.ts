import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function useAutoLogin() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.replace("/(tabs)"); // Navigate to Ride tab after login
    } else {
      router.replace("/(auth)/login"); // Go to login if not signed in
    }
  }, [isLoaded, isSignedIn]);
}
