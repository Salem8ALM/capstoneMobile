import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/App/Dashboard";
import Chat from "../screens/App/Chat";
import MainChatLayout from "../screens/App/MainChatLayout";
import Profile from "../screens/App/Profile";
import Requests from "../screens/App/Requests";

const Tab = createBottomTabNavigator();
const ChatStack = createNativeStackNavigator();

function ChatStackNavigator() {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="ChatList" component={Chat} />
      <ChatStack.Screen name="MainChat" component={MainChatLayout} />
    </ChatStack.Navigator>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#292933",
          borderTopColor: "rgba(255, 255, 255, 0.1)",
        },
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "#71717A",
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Chat" component={ChatStackNavigator} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Requests" component={Requests} />
    </Tab.Navigator>
  );
};

export default TabNavigator; 