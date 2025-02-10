import { useState, useRef } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native"
import { Feather } from "@expo/vector-icons"
import { Requests } from "../screens/App/Requests"
import Chat from "../screens/App/Chats"
import { Profile } from "../screens/App/Profile"
import Dashboard from "../screens/App/Dashboard"
import NotificationsModal from "../components/NotificationsModal"
import TabBarBackground from "../components/TabBarBackground"

// ... rest of the code 