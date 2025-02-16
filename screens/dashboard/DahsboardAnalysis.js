import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Card } from "react-native-paper";
import LottieView from "lottie-react-native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const FinancialAnalysisScreen = ({ route }) => {
  const { data } = route.params;

  const businessOwnerUser = data.businessOwnerUser;
  const financialStatement = data.financialStatement;

  const businessNickname = data.businessNickname;

  const financials = financialStatement.financialStatementAssessment;

  return (
    <ScrollView style={styles.container}>
      {/* Business Header */}
      <Card style={styles.headerCard}>
        <Text style={styles.title}>{businessNickname}</Text>
        <Text style={styles.subtitle}>
          {businessOwnerUser.firstName} {businessOwnerUser.lastName}
        </Text>
      </Card>

      {/* Financial Overview */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Financial Overview</Text>
        <LineChart
          data={{
            labels: ["Revenue", "Expenses", "Net Income"],
            datasets: [
              {
                data: [200000, 40000, 80000],
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: "#1c1c1c",
            backgroundGradientFrom: "#1c1c1c",
            backgroundGradientTo: "#1c1c1c",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 223, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffd700",
            },
          }}
          bezier
          style={styles.chart}
        />
      </Card>

      {/* Profitability Analysis */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Profitability Ratios</Text>
        <PieChart
          data={[
            {
              name: "Gross Margin",
              population: financials.profitabilityGrossMargin * 100,
              color: "#ffd700",
              legendFontColor: "#ffffff",
              legendFontSize: 14,
            },
            {
              name: "Net Margin",
              population: financials.profitabilityNetMargin * 100,
              color: "#ffed4a",
              legendFontColor: "#ffffff",
              legendFontSize: 14,
            },
            {
              name: "Return on Assets",
              population: financials.profitabilityReturnOnAssets * 100,
              color: "#fff176",
              legendFontColor: "#ffffff",
              legendFontSize: 14,
            },
          ]}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#1c1c1c",
            backgroundGradientFrom: "#1c1c1c",
            backgroundGradientTo: "#1c1c1c",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 223, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
      </Card>

      {/* Market Overview */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Market Overview</Text>
        <Text style={styles.description}>{financials.marketOverview}</Text>
      </Card>

      {/* Lottie Animation */}
      <View style={styles.animationContainer}>
        <LottieView
          source={require("../../assets/AI-animation-1.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  headerCard: {
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    borderWidth: 1,
    borderColor: "#ffd700",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
  },
  card: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333333",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",
  },
  description: {
    fontSize: 16,
    color: "#ffffff",
  },
  animationContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default FinancialAnalysisScreen;
