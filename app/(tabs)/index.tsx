import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function Index() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
     <ImageBackground
          source={require('@/assets/images/Electric transport-cuate.png')}
          resizeMode="cover"
          style={styles.background}
        >
      <View style={styles.container}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <FontAwesome name="power-off" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Welcome to Carpool Buddy 🚘</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 100,
  },
  signOutButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 30,
    zIndex: 10,
  },
});
