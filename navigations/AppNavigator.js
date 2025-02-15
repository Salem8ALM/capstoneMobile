"use client";

import { useState, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Requests } from "./../screens/App/Requests";
import Chat from "../screens/App/Chats";
import { Profile } from "./../screens/App/Profile";
import Dashboard from "./../screens/App/Dashboard";
import NotificationsModal from "../components/NotificationsModal.jsx";
import TabBarBackground from "../components/TabBarBackground.jsx";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const tabAnimations = useRef({
    Dashboard: new Animated.Value(0),
    Requests: new Animated.Value(0),
    Notifications: new Animated.Value(0),
    Chat: new Animated.Value(0),
    Profile: new Animated.Value(0),
  }).current;

  const animateTab = (tabName: string, focused: boolean) => {
    Animated.spring(tabAnimations[tabName], {
      toValue: focused ? 1 : 0,
      tension: 50,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const TabIcon = ({ name, color, size, focused, tabName }) => {
    const scale = tabAnimations[tabName].interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.2],
    });

    return (
      <Animated.View
        style={[
          styles.tabIconContainer,
          focused && styles.activeTabContainer,
          { transform: [{ scale }] },
        ]}
      >
        <Feather name={name} size={size} color={focused ? "#292933" : color} />
      </Animated.View>
    );
  };

  const NotificationIcon = ({ color, size, focused }) => (
    <Animated.View
      style={[
        styles.notificationContainer,
        focused && styles.activeTabContainer,
        {
          transform: [
            {
              scale: tabAnimations.Notifications.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          setNotificationsVisible(true);
          animateTab("Notifications", true);
        }}
        style={styles.notificationIconWrapper}
      >
        <Feather name="bell" size={size} color={focused ? "#292933" : color} />
      </TouchableOpacity>
    </Animated.View>
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
          tabBarHideOnKeyboard: true,
          animation: "none",
          animationEnabled: false,
        }}
        screenListeners={{
          state: (e) => {
            // Animate the transition
            const currentRoute = e.data.state.routes[e.data.state.index];
            Object.keys(tabAnimations).forEach((tabName) => {
              animateTab(tabName, tabName === currentRoute.name);
            });
          },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                name="home"
                color={color}
                size={size}
                focused={focused}
                tabName="Dashboard"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Requests"
          component={Requests}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                name="file-text"
                color={color}
                size={size}
                focused={focused}
                tabName="Requests"
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
              animateTab("Notifications", true);
            },
          }}
        />
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                name="message-circle"
                color={color}
                size={size}
                focused={focused}
                tabName="Chat"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                name="user"
                color={color}
                size={size}
                focused={focused}
                tabName="Profile"
              />
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
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  activeTabContainer: {
    backgroundColor: "#FFD700",
  },
  notificationContainer: {
    top: -45,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  notificationIconWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppNavigator;
