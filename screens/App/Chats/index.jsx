import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ChatList } from "./ChatList"
import { ChatDetail } from "./ChatDetail"


const Stack = createNativeStackNavigator()

export const Chat = () => {
  return (

    <SafeAreaProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { 
            backgroundColor: "#1C1C1E",
            paddingTop: 30 , // Added top padding for iOS
          },
        }}
      >
        <Stack.Screen name="ChatList" component={ChatList} />
        <Stack.Screen name="ChatDetail" component={ChatDetail} />
      </Stack.Navigator>
    </SafeAreaProvider>
  )
}

export default Chat;    