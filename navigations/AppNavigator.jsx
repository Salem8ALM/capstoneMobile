import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/App/Dashboard';
import Chat from '../screens/App/Chat';
import Profile from '../screens/App/Profile';
import Requests from '../screens/App/Requests';
import MainChatLayout from '../screens/App/MainChatLayout';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#292933' }
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="MainChatLayout" component={MainChatLayout} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Requests" component={Requests} />
    </Stack.Navigator>
  );
};

export default AppNavigator; 