import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { deleteToken } from "../storage/TokenStorage";
import { getCompanyAPI } from "../api/Business";

export default function DashboardScreen() {
  const { authenticated, setAuthenticated, onboarded, setOnboarded } =
    useContext(UserContext);

  // checking token and whether the user is onboarded
  const checkUserState = async () => {
    const token = await checkToken();
    await checkBusinessEntity(token);
  };

  const checkToken = async () => {
    const token = await getToken("access");
    console.log("INside check token" + token);

    if (token) {
      setAuthenticated(true);

      return token;
    } else {
      Alert.alert("Please log in again", "The session has timed out");
    }
  };

  const checkBusinessEntity = async (token) => {
    console.log(token);
    try {
      await getCompanyAPI(token);
      setOnboarded(true);
    } catch (error) {
      setOnboarded(false);
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserState();
  }, []);

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
