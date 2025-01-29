import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Requests } from "./../screens/App/Requests";
import { Chat } from "./../screens/App/Chat";
import { Profile } from "./../screens/App/Profile";
import Dashboard from "./../screens/App/Dashboard";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import NotificationsModal from "../components/NotificationsModal.jsx";
import TabBarBackground from "../components/TabBarBackground.jsx";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [notificationsVisible, setNotificationsVisible] = useState(false);

  const NotificationIcon = ({ color, size }) => (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationIconWrapper}>
        <TouchableOpacity onPress={() => setNotificationsVisible(true)}>
          <Ionicons name="notifications-outline" size={size} color={color} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "transparent",
            height: 60,
            borderTopWidth: 0,
            position: "absolute",
            elevation: 0,
          },
          tabBarBackground: () => <TabBarBackground />,
          tabBarActiveTintColor: "#FFD700",
          tabBarInactiveTintColor: "#8E8E93",
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 5,
          },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Requests"
          component={Requests}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="document-text-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={View}
          options={{
            tabBarIcon: (props) => <NotificationIcon {...props} />,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setNotificationsVisible(true);
            },
          }}
        />
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>

      <NotificationsModal
        visible={notificationsVisible}
        onClose={() => setNotificationsVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    top: -45,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationIconWrapper: {
    backgroundColor: "transparent",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default AppNavigator;
