import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import UserContext from "../context/UserContext";

export default function DashboardScreen() {
  const [authenticated, setAuthenticated] = useContext(UserContext);

  return (
    <View>
      <Text>Dashboard Screen</Text>
      <Text onPress={() => setAuthenticated(false)}>logout</Text>
      <></>
    </View>
  );
}

const styles = StyleSheet.create({});
