import React, { useContext, useEffect } from "react";

import { View, StyleSheet, SafeAreaView } from "react-native";
import ProgressBar from "../../components/ProgressBar";
import LoanApplicationCard from "../../components/LoanApplicationCard";
import SentRequests from "../../components/SentRequests";

import { deleteToken, getToken } from "../../storage/TokenStorage";
import { getCompanyAPI } from "../../api/Business";
import UserContext from "../../context/UserContext";
import { Text } from "react-native-paper";

const Dashboard = () => {
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
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <Text
          color="white"
          onPress={() => {
            deleteToken("access");
            setAuthenticated(false);
          }}
        >
          logout
        </Text>
        <ProgressBar />
        <LoanApplicationCard />
        <SentRequests />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292933",
  },
  safeAreaView: {
    // flex: 1,
    backgroundColor: "#292933",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Dashboard;
