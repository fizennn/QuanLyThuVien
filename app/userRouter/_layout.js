import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {
  return (
    
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        
      }}
    >
      <Tabs.Screen
        name="home_screen"
        options={{
          title: 'Trang Chủ',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
            
          ),
        }}
      />
      <Tabs.Screen
        name="registration_form"
        options={{
          title: 'Phiếu Đăng Ký',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'ticket' : 'ticket-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile_screen"
        options={{
          title: 'Cá Nhân',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
