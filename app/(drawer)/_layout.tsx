import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerType: 'slide',
        }}
      >
        <Drawer.Screen
          name='index'
          options={{
            drawerLabel: 'Home',
            title: 'HomePage',
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen
          name='about'
          options={{
            drawerLabel: 'About',
            title: 'About Screen',
            headerTitleAlign: 'center',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
