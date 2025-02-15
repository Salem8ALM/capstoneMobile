"use client";

import { useState, useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Requests } from "./../screens/App/Requests";
import Chat from "../screens/App/Chats";
import { Profile } from "./../screens/App/Profile";
import Dashboard from "./../screens/App/Dashboard";
import NotificationsModal from "../components/NotificationsModal.jsx";
import TabBarBackground from "../components/TabBarBackground.jsx";
import { useTabBar } from "./TabBarProvider";
import ChatAnimations from "../utils/animations/chatAnimations";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [notificationsVisible, setNotificationsVisible] = useState(false);

  const { showTabBar } = useTabBar(); // Get the tab bar visibility state

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

  // Initialize Animated.Value to control sliding
  const slideAnim = useRef(new Animated.Value(0)).current; // 0 means tab bar is visible initially

  // Trigger the slide animation whenever showTabBar changes
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: showTabBar ? 0 : 60, // Slide up to 0 (show) when true, slide down to 60 (hide) when false
      duration: 300, // Animation duration
      useNativeDriver: true, // Use native driver for performance
    }).start();
  }, [showTabBar]); // Run animation when showTabBar changes

  return (
    <>
      <ChatAnimations
        toValueSequence={[0.5, 0]}
        duration={2000000}
        outputRange={["45deg", "100deg"]}
        lineSpacing={50}
        lineOffset={0}
        verticalOffset={50} // Shift the entire animation down by 50 units
      />

      <ChatAnimations
        toValueSequence={[2, 0]}
        duration={20000}
        outputRange={["45deg", "100deg"]}
        lineSpacing={100}
        lineOffset={0}
        verticalOffset={-30} // Shift the entire animation up by 30 units
      />

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "transparent",
            height: 60,
            borderTopWidth: 0,
            position: "absolute",
            elevation: 0,
            display: showTabBar ? "flex" : "none", // Hide or show tab bar based on context
            transform: [{ translateY: slideAnim }], // Apply sliding animation
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
