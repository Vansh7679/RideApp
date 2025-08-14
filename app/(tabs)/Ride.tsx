import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function Ride() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('@/assets/images/Delivery-amico.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Ride Options</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/(ride)/offer')}>
          <Text style={styles.buttonText}>🚗 Offer a Ride</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/(ride)/take')}>
          <Text style={styles.buttonText}>🧍‍♂️ Take a Ride</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/(ride)/details')}>
          <Text style={styles.buttonText}>📅 View Ride Details</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // semi-transparent overlay for readability
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
