import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { useState } from 'react';

export default function RootLayout() {
  // const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <StatusBar barStyle='dark-content' />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(drawer)' />
      </Stack>
    </>
  );
}
