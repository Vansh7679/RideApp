import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { styles } from '@/styles/auth.styles';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/Theme';
import { useSSO, useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';


export default function Login() {
  const { startSSOFlow } = useSSO();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const userData = useQuery(
    api.users.getUserById,
    user?.id ? { userId: user.id as Id<"users"> } : "skip"
  );

  useEffect(() => {
    if (isSignedIn && user) {
      if (userData === undefined) return;

      if (userData === null) {
        router.replace('/(auth)/register');
      } else {
        router.replace('/(tabs)');
      }
    }
  }, [isSignedIn, user, userData]);

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
      });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (error) {
      console.error('OAuth error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="bike" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>Ride</Text>
        <Text style={styles.tagline}>Don't miss any Ride</Text>
      </View>

      <View style={styles.illustrationContainer}>
        <Image
          source={require('@/assets/images/driving-bro.png')}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      <View style={styles.loginSection}>
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color={COLORS.surface} />
          </View>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push('/(auth)/register')}
        style={{ marginTop: 20, padding: 10, alignItems: 'center' }}
      >
        <Text style={{ color: COLORS.primary }}>New user? Register here</Text>
      </TouchableOpacity>

      {isSignedIn && userData === undefined && (
        <ActivityIndicator style={{ marginTop: 20 }} color={COLORS.primary} />
      )}
    </View>
  );
}
