import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import screen1 from './screen1';
import screen2 from './screen2';
import screen3 from './screen3';
import screen4 from './screen4';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Car') {
              iconName = focused ? 'car-sport' : 'car-sport-outline';
            } else if (route.name === 'Favorite') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="screen1" component={screen1} />
        <Tab.Screen name="screen2" component={screen2} />
        <Tab.Screen name="screen3" component={screen3} />
        <Tab.Screen name="screen4" component={screen4} />
      </Tab.Navigator>
  );
}