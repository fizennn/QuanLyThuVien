import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14 },
        tabBarStyle: {
          position: 'absolute',
          top: 0, // Đưa tab lên đầu
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          height: 40,
        },
        headerShown: false,
        tabBarIconStyle: {
          display: 'none',
        },
      }}
    >
      <Tabs.Screen
        name="book_screen"
        options={{
          title: 'Sách',
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                width: '100%',
                height: '100%',
                textAlign: 'center',
                fontSize: 14,
                borderBottomWidth: focused ? 2 : 0,
                borderBottomColor: focused ? '#2196F3' : 'transparent',
                paddingBottom: 4,
                color: focused ? '#2196F3' : 'black',
                fontWeight: focused ? 'bold' : 'normal',
              }}
            >
              Sách
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="genre_screen"
        options={{
          title: 'Thể Loại',
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                width: '100%',
                height: '100%',
                textAlign: 'center',
                fontSize: 14,
                borderBottomWidth: focused ? 2 : 0,
                borderBottomColor: focused ? '#2196F3' : 'transparent',
                paddingBottom: 4,
                color: focused ? '#2196F3' : 'black',
                fontWeight: focused ? 'bold' : 'normal',
              }}
            >
              Thể Loại
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
