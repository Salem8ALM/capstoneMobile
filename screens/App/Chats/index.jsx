import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ChatList } from "./ChatList";
import { ChatDetail } from "./ChatDetail";
import { Platform, View } from "react-native";
import ChatAnimations from "../../../utils/animations/chatAnimations";

const Stack = createNativeStackNavigator();

export const Chat = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1C1C1E",
        paddingTop: 30,
      }}
    >
      <SafeAreaProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#1C1C1E",
              paddingTop: Platform.OS === "ios" ? 30 : 0, // Apply paddingTop based on the platform
            },
          }}
        >
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen name="ChatDetail" component={ChatDetail} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </View>
  );
};

export default Chat;
