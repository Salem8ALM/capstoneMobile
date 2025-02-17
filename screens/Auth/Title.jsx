import React from "react";
import { View, Text } from "react-native";

const Title = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "MavenPro-ExtraBold",
          fontWeight: "bold",

          fontSize: 36,
          letterSpacing: 1,
          color: "#ffffff", // Replace with your sidebar-text color
        }}
      >
        $h
      </Text>
      <Text
        style={{
          fontFamily: "MavenPro-ExtraBold",
          fontWeight: "bold",

          fontSize: 36,
          letterSpacing: 1,
          color: "#ffdd44", // Replace with your sidebar-accent color
          marginLeft: 0,
        }}
      >
        loan
      </Text>
      <Text
        style={{
          fontFamily: "MavenPro-ExtraBold",
          fontWeight: "bold",
          fontSize: 36,
          letterSpacing: 1,
          color: "#ffffff", // Replace with your sidebar-text color
          marginLeft: 0,
        }}
      >
        ik
      </Text>
    </View>
  );
};

export default Title;
