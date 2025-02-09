import { View, StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context'

export function Chat() {
  return (
    <SafeAreaViewContext 
      style={styles.container}
      edges={[]}
    >
      <View style={styles.content}>
        <Text style={styles.text}>Chat Screen</Text>
      </View>
    </SafeAreaViewContext>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292933",
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  }
})

export default Chat

