// app/auth/register.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";

export default function RegisterScreen() {
  const { isLoaded, userId } = useAuth(); // 🔥 Auth status
  const { user } = useUser();
  const [collegeEmail, setCollegeEmail] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [collegeIdCard, setCollegeIdCard] = useState("");

  const updateUser = useMutation(api.users.updateUserProfile);

  const pickImage = async (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setter(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const handleSubmit = async () => {
    if (!isLoaded || !userId) {
      Alert.alert("Please wait, authentication not ready.");
      return;
    }

    if (!collegeEmail || !collegeName || !profileImage || !collegeIdCard) {
      Alert.alert("Please fill all fields and upload both images.");
      return;
    }

    try {
      await updateUser({
        userId: userId, // ✅ Pass userId from Clerk
        collegeEmail,
        collegeIdCard,
        university: collegeName,
        profileImage,
      });

      Alert.alert("Registration Complete!");
      router.replace("/(tabs)/Ride"); // 🚀 To Ride screen
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error saving profile. Try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text>College Email</Text>
      <TextInput
        value={collegeEmail}
        onChangeText={setCollegeEmail}
        placeholder="you@college.edu"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <Text>College Name</Text>
      <TextInput
        value={collegeName}
        onChangeText={setCollegeName}
        placeholder="University of XYZ"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <Text>Upload Profile Image</Text>
      <TouchableOpacity
        onPress={() => pickImage(setProfileImage)}
        style={{
          backgroundColor: "#2196F3",
          padding: 10,
          alignItems: "center",
          borderRadius: 5,
          marginVertical: 10,
        }}
      >
        <Text style={{ color: "white" }}>Choose Profile Image</Text>
      </TouchableOpacity>

      {profileImage && (
        <Image
          source={{ uri: profileImage }}
          style={{ height: 100, marginTop: 10, width: "100%" }}
        />
      )}

      <Text>Upload College ID Card</Text>
      <TouchableOpacity
        onPress={() => pickImage(setCollegeIdCard)}
        style={{
          backgroundColor: "#2196F3",
          padding: 10,
          alignItems: "center",
          borderRadius: 5,
          marginVertical: 10,
        }}
      >
        <Text style={{ color: "white" }}>Choose ID Card Image</Text>
      </TouchableOpacity>

      {collegeIdCard && (
        <Image
          source={{ uri: collegeIdCard }}
          style={{ height: 100, marginTop: 10, width: "100%" }}
        />
      )}

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={!isLoaded}
        style={{
          backgroundColor: isLoaded ? "#4CAF50" : "gray",
          padding: 12,
          alignItems: "center",
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
