import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { deleteToken } from "../storage/TokenStorage";

export default function DashboardScreen() {
  const { authenticated, setAuthenticated, onboarded, setOnboarded } =
    useContext(UserContext);

  return (
    <View>
      <Text>Dashboard Screen</Text>
      <Text
        onPress={() => {
          deleteToken("access");
          setAuthenticated(false);
        }}
      >
        logout
      </Text>
      <></>
    </View>
  );
}

const styles = StyleSheet.create({});
