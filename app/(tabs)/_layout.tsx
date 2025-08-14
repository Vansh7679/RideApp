import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/Theme';

export default function Tablayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown:false,
        tabBarInactiveTintColor:COLORS.grey,
        tabBarActiveTintColor:COLORS.primary,
        tabBarStyle:{
          backgroundColor:"black",
          borderTopWidth:0,
          position:"absolute",
          elevation:0,
          height:40,
          paddingBottom:8
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ tabBarIcon: ({ size, color }) => <Ionicons name="home" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="Ride"
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <MaterialCommunityIcons
              name="bike"
              size={size}
              color={ color} 
            />
          )
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{ tabBarIcon: ({ size,color }) => <Ionicons name="search" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="Help"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="headset" 
              size={size}
              color={color}
            />
          )
        }}
      />
    </Tabs>
  );
}