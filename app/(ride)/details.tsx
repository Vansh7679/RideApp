import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function RideDetails() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Ride Details</Text>
      <Text style={styles.subtitle}>
        Here you can view your scheduled rides, timing, and maps.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
  },
});
