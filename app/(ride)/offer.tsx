import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const backgroundImage = require("../../assets/images/Job offers-cuate.png"); // 🖼️ Add your background image here

export default function OfferRideScreen() {
  const { user } = useUser();
  const router = useRouter();

  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [model, setModel] = useState("");
  const [plateNumber, setPlateNumber] = useState("");

  const currentUser = useQuery(api.users.getCurrentUserByClerkId, {
    clerkId: user?.id || "",
  });

  const createRide = useMutation(api.users.createRide);

  const handleSubmit = async () => {
    if (!user || !currentUser) {
      Alert.alert("User not found");
      return;
    }

    if (
      !startLocation ||
      !endLocation ||
      !departureTime ||
      !availableSeats ||
      !model ||
      !plateNumber
    ) {
      Alert.alert("Please fill all the fields");
      return;
    }

    try {
      await createRide({
        driverId: currentUser._id,
        startLocation,
        endLocation,
        departureTime,
        availableSeats: parseInt(availableSeats),
        vehicleDetails: {
          model,
          plateNumber,
        },
      });

      Alert.alert("🎉 Ride Offered Successfully!");
      router.replace("./(tabs)/index");
    } catch (err) {
      console.error("Create ride error", err);
      Alert.alert("Something went wrong");
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formBox}>
          <Text style={styles.heading}>🚗 Offer a Ride</Text>

          <TextInput
            style={styles.input}
            placeholder="Start Location"
            placeholderTextColor="#999"
            onChangeText={setStartLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="End Location"
            placeholderTextColor="#999"
            onChangeText={setEndLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="Departure Time (e.g., 5:30 PM)"
            placeholderTextColor="#999"
            onChangeText={setDepartureTime}
          />
          <TextInput
            style={styles.input}
            placeholder="Available Seats"
            placeholderTextColor="#999"
            keyboardType="numeric"
            onChangeText={setAvailableSeats}
          />
          <TextInput
            style={styles.input}
            placeholder="Vehicle Model"
            placeholderTextColor="#999"
            onChangeText={setModel}
          />
          <TextInput
            style={styles.input}
            placeholder="Vehicle Plate Number"
            placeholderTextColor="#999"
            onChangeText={setPlateNumber}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Ride</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  formBox: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e90ff",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#f4f4f4",
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 16,
    borderRadius: 50,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
