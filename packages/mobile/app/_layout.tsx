import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { theme } from '@cloudnative/shared'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { LoadingScreen } from '../components'

SplashScreen.preventAutoHideAsync()

function RootLayoutNav() {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.backgroundDark,
          },
          headerTintColor: theme.colors.white,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="session/[id]"
          options={{
            title: 'Session Details',
            presentation: 'modal',
          }}
        />
      </Stack>
    </>
  )
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  )
}
